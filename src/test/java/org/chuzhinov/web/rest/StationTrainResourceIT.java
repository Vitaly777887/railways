package org.chuzhinov.web.rest;

import org.chuzhinov.RailwaysApp;
import org.chuzhinov.domain.StationTrain;
import org.chuzhinov.domain.Station;
import org.chuzhinov.domain.Train;
import org.chuzhinov.repository.StationTrainRepository;
import org.chuzhinov.service.StationTrainService;
import org.chuzhinov.service.dto.StationTrainDTO;
import org.chuzhinov.service.mapper.StationTrainMapper;
import org.chuzhinov.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static org.chuzhinov.web.rest.TestUtil.sameInstant;
import static org.chuzhinov.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StationTrainResource} REST controller.
 */
@SpringBootTest(classes = RailwaysApp.class)
public class StationTrainResourceIT {

    private static final ZonedDateTime DEFAULT_ARRIVAL_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ARRIVAL_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_DEPARTURE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DEPARTURE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private StationTrainRepository stationTrainRepository;

    @Autowired
    private StationTrainMapper stationTrainMapper;

    @Autowired
    private StationTrainService stationTrainService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStationTrainMockMvc;

    private StationTrain stationTrain;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StationTrainResource stationTrainResource = new StationTrainResource(stationTrainService);
        this.restStationTrainMockMvc = MockMvcBuilders.standaloneSetup(stationTrainResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StationTrain createEntity(EntityManager em) {
        StationTrain stationTrain = new StationTrain()
            .arrivalTime(DEFAULT_ARRIVAL_TIME)
            .departureTime(DEFAULT_DEPARTURE_TIME);
        // Add required entity
        Station station;
        if (TestUtil.findAll(em, Station.class).isEmpty()) {
            station = StationResourceIT.createEntity(em);
            em.persist(station);
            em.flush();
        } else {
            station = TestUtil.findAll(em, Station.class).get(0);
        }
        stationTrain.setStation(station);
        // Add required entity
        Train train;
        if (TestUtil.findAll(em, Train.class).isEmpty()) {
            train = TrainResourceIT.createEntity(em);
            em.persist(train);
            em.flush();
        } else {
            train = TestUtil.findAll(em, Train.class).get(0);
        }
        stationTrain.setTrain(train);
        return stationTrain;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StationTrain createUpdatedEntity(EntityManager em) {
        StationTrain stationTrain = new StationTrain()
            .arrivalTime(UPDATED_ARRIVAL_TIME)
            .departureTime(UPDATED_DEPARTURE_TIME);
        // Add required entity
        Station station;
        if (TestUtil.findAll(em, Station.class).isEmpty()) {
            station = StationResourceIT.createUpdatedEntity(em);
            em.persist(station);
            em.flush();
        } else {
            station = TestUtil.findAll(em, Station.class).get(0);
        }
        stationTrain.setStation(station);
        // Add required entity
        Train train;
        if (TestUtil.findAll(em, Train.class).isEmpty()) {
            train = TrainResourceIT.createUpdatedEntity(em);
            em.persist(train);
            em.flush();
        } else {
            train = TestUtil.findAll(em, Train.class).get(0);
        }
        stationTrain.setTrain(train);
        return stationTrain;
    }

    @BeforeEach
    public void initTest() {
        stationTrain = createEntity(em);
    }

    @Test
    @Transactional
    public void createStationTrain() throws Exception {
        int databaseSizeBeforeCreate = stationTrainRepository.findAll().size();

        // Create the StationTrain
        StationTrainDTO stationTrainDTO = stationTrainMapper.toDto(stationTrain);
        restStationTrainMockMvc.perform(post("/api/station-trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationTrainDTO)))
            .andExpect(status().isCreated());

        // Validate the StationTrain in the database
        List<StationTrain> stationTrainList = stationTrainRepository.findAll();
        assertThat(stationTrainList).hasSize(databaseSizeBeforeCreate + 1);
        StationTrain testStationTrain = stationTrainList.get(stationTrainList.size() - 1);
        assertThat(testStationTrain.getArrivalTime()).isEqualTo(DEFAULT_ARRIVAL_TIME);
        assertThat(testStationTrain.getDepartureTime()).isEqualTo(DEFAULT_DEPARTURE_TIME);
    }

    @Test
    @Transactional
    public void createStationTrainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stationTrainRepository.findAll().size();

        // Create the StationTrain with an existing ID
        stationTrain.setId(1L);
        StationTrainDTO stationTrainDTO = stationTrainMapper.toDto(stationTrain);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStationTrainMockMvc.perform(post("/api/station-trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationTrainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StationTrain in the database
        List<StationTrain> stationTrainList = stationTrainRepository.findAll();
        assertThat(stationTrainList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkArrivalTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = stationTrainRepository.findAll().size();
        // set the field null
        stationTrain.setArrivalTime(null);

        // Create the StationTrain, which fails.
        StationTrainDTO stationTrainDTO = stationTrainMapper.toDto(stationTrain);

        restStationTrainMockMvc.perform(post("/api/station-trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationTrainDTO)))
            .andExpect(status().isBadRequest());

        List<StationTrain> stationTrainList = stationTrainRepository.findAll();
        assertThat(stationTrainList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDepartureTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = stationTrainRepository.findAll().size();
        // set the field null
        stationTrain.setDepartureTime(null);

        // Create the StationTrain, which fails.
        StationTrainDTO stationTrainDTO = stationTrainMapper.toDto(stationTrain);

        restStationTrainMockMvc.perform(post("/api/station-trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationTrainDTO)))
            .andExpect(status().isBadRequest());

        List<StationTrain> stationTrainList = stationTrainRepository.findAll();
        assertThat(stationTrainList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStationTrains() throws Exception {
        // Initialize the database
        stationTrainRepository.saveAndFlush(stationTrain);

        // Get all the stationTrainList
        restStationTrainMockMvc.perform(get("/api/station-trains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stationTrain.getId().intValue())))
            .andExpect(jsonPath("$.[*].arrivalTime").value(hasItem(sameInstant(DEFAULT_ARRIVAL_TIME))))
            .andExpect(jsonPath("$.[*].departureTime").value(hasItem(sameInstant(DEFAULT_DEPARTURE_TIME))));
    }
    
    @Test
    @Transactional
    public void getStationTrain() throws Exception {
        // Initialize the database
        stationTrainRepository.saveAndFlush(stationTrain);

        // Get the stationTrain
        restStationTrainMockMvc.perform(get("/api/station-trains/{id}", stationTrain.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stationTrain.getId().intValue()))
            .andExpect(jsonPath("$.arrivalTime").value(sameInstant(DEFAULT_ARRIVAL_TIME)))
            .andExpect(jsonPath("$.departureTime").value(sameInstant(DEFAULT_DEPARTURE_TIME)));
    }

    @Test
    @Transactional
    public void getNonExistingStationTrain() throws Exception {
        // Get the stationTrain
        restStationTrainMockMvc.perform(get("/api/station-trains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStationTrain() throws Exception {
        // Initialize the database
        stationTrainRepository.saveAndFlush(stationTrain);

        int databaseSizeBeforeUpdate = stationTrainRepository.findAll().size();

        // Update the stationTrain
        StationTrain updatedStationTrain = stationTrainRepository.findById(stationTrain.getId()).get();
        // Disconnect from session so that the updates on updatedStationTrain are not directly saved in db
        em.detach(updatedStationTrain);
        updatedStationTrain
            .arrivalTime(UPDATED_ARRIVAL_TIME)
            .departureTime(UPDATED_DEPARTURE_TIME);
        StationTrainDTO stationTrainDTO = stationTrainMapper.toDto(updatedStationTrain);

        restStationTrainMockMvc.perform(put("/api/station-trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationTrainDTO)))
            .andExpect(status().isOk());

        // Validate the StationTrain in the database
        List<StationTrain> stationTrainList = stationTrainRepository.findAll();
        assertThat(stationTrainList).hasSize(databaseSizeBeforeUpdate);
        StationTrain testStationTrain = stationTrainList.get(stationTrainList.size() - 1);
        assertThat(testStationTrain.getArrivalTime()).isEqualTo(UPDATED_ARRIVAL_TIME);
        assertThat(testStationTrain.getDepartureTime()).isEqualTo(UPDATED_DEPARTURE_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingStationTrain() throws Exception {
        int databaseSizeBeforeUpdate = stationTrainRepository.findAll().size();

        // Create the StationTrain
        StationTrainDTO stationTrainDTO = stationTrainMapper.toDto(stationTrain);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStationTrainMockMvc.perform(put("/api/station-trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationTrainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StationTrain in the database
        List<StationTrain> stationTrainList = stationTrainRepository.findAll();
        assertThat(stationTrainList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStationTrain() throws Exception {
        // Initialize the database
        stationTrainRepository.saveAndFlush(stationTrain);

        int databaseSizeBeforeDelete = stationTrainRepository.findAll().size();

        // Delete the stationTrain
        restStationTrainMockMvc.perform(delete("/api/station-trains/{id}", stationTrain.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StationTrain> stationTrainList = stationTrainRepository.findAll();
        assertThat(stationTrainList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StationTrain.class);
        StationTrain stationTrain1 = new StationTrain();
        stationTrain1.setId(1L);
        StationTrain stationTrain2 = new StationTrain();
        stationTrain2.setId(stationTrain1.getId());
        assertThat(stationTrain1).isEqualTo(stationTrain2);
        stationTrain2.setId(2L);
        assertThat(stationTrain1).isNotEqualTo(stationTrain2);
        stationTrain1.setId(null);
        assertThat(stationTrain1).isNotEqualTo(stationTrain2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StationTrainDTO.class);
        StationTrainDTO stationTrainDTO1 = new StationTrainDTO();
        stationTrainDTO1.setId(1L);
        StationTrainDTO stationTrainDTO2 = new StationTrainDTO();
        assertThat(stationTrainDTO1).isNotEqualTo(stationTrainDTO2);
        stationTrainDTO2.setId(stationTrainDTO1.getId());
        assertThat(stationTrainDTO1).isEqualTo(stationTrainDTO2);
        stationTrainDTO2.setId(2L);
        assertThat(stationTrainDTO1).isNotEqualTo(stationTrainDTO2);
        stationTrainDTO1.setId(null);
        assertThat(stationTrainDTO1).isNotEqualTo(stationTrainDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(stationTrainMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(stationTrainMapper.fromId(null)).isNull();
    }
}
