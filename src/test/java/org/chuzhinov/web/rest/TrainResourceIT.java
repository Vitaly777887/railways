package org.chuzhinov.web.rest;

import org.chuzhinov.RailwaysApp;
import org.chuzhinov.domain.Train;
import org.chuzhinov.repository.TrainRepository;
import org.chuzhinov.service.TrainService;
import org.chuzhinov.service.dto.TrainDTO;
import org.chuzhinov.service.mapper.TrainMapper;
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
import java.util.List;

import static org.chuzhinov.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TrainResource} REST controller.
 */
@SpringBootTest(classes = RailwaysApp.class)
public class TrainResourceIT {

    private static final Integer DEFAULT_COUNT_PASSENGERS = 1;
    private static final Integer UPDATED_COUNT_PASSENGERS = 2;

    private static final Integer DEFAULT_NUMBER_TRAIN = 1;
    private static final Integer UPDATED_NUMBER_TRAIN = 2;

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private TrainMapper trainMapper;

    @Autowired
    private TrainService trainService;

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

    private MockMvc restTrainMockMvc;

    private Train train;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrainResource trainResource = new TrainResource(trainService);
        this.restTrainMockMvc = MockMvcBuilders.standaloneSetup(trainResource)
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
    public static Train createEntity(EntityManager em) {
        Train train = new Train()
            .countPassengers(DEFAULT_COUNT_PASSENGERS)
            .numberTrain(DEFAULT_NUMBER_TRAIN);
        return train;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Train createUpdatedEntity(EntityManager em) {
        Train train = new Train()
            .countPassengers(UPDATED_COUNT_PASSENGERS)
            .numberTrain(UPDATED_NUMBER_TRAIN);
        return train;
    }

    @BeforeEach
    public void initTest() {
        train = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrain() throws Exception {
        int databaseSizeBeforeCreate = trainRepository.findAll().size();

        // Create the Train
        TrainDTO trainDTO = trainMapper.toDto(train);
        restTrainMockMvc.perform(post("/api/trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainDTO)))
            .andExpect(status().isCreated());

        // Validate the Train in the database
        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeCreate + 1);
        Train testTrain = trainList.get(trainList.size() - 1);
        assertThat(testTrain.getCountPassengers()).isEqualTo(DEFAULT_COUNT_PASSENGERS);
        assertThat(testTrain.getNumberTrain()).isEqualTo(DEFAULT_NUMBER_TRAIN);
    }

    @Test
    @Transactional
    public void createTrainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainRepository.findAll().size();

        // Create the Train with an existing ID
        train.setId(1L);
        TrainDTO trainDTO = trainMapper.toDto(train);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainMockMvc.perform(post("/api/trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Train in the database
        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCountPassengersIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainRepository.findAll().size();
        // set the field null
        train.setCountPassengers(null);

        // Create the Train, which fails.
        TrainDTO trainDTO = trainMapper.toDto(train);

        restTrainMockMvc.perform(post("/api/trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainDTO)))
            .andExpect(status().isBadRequest());

        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumberTrainIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainRepository.findAll().size();
        // set the field null
        train.setNumberTrain(null);

        // Create the Train, which fails.
        TrainDTO trainDTO = trainMapper.toDto(train);

        restTrainMockMvc.perform(post("/api/trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainDTO)))
            .andExpect(status().isBadRequest());

        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrains() throws Exception {
        // Initialize the database
        trainRepository.saveAndFlush(train);

        // Get all the trainList
        restTrainMockMvc.perform(get("/api/trains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(train.getId().intValue())))
            .andExpect(jsonPath("$.[*].countPassengers").value(hasItem(DEFAULT_COUNT_PASSENGERS)))
            .andExpect(jsonPath("$.[*].numberTrain").value(hasItem(DEFAULT_NUMBER_TRAIN)));
    }
    
    @Test
    @Transactional
    public void getTrain() throws Exception {
        // Initialize the database
        trainRepository.saveAndFlush(train);

        // Get the train
        restTrainMockMvc.perform(get("/api/trains/{id}", train.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(train.getId().intValue()))
            .andExpect(jsonPath("$.countPassengers").value(DEFAULT_COUNT_PASSENGERS))
            .andExpect(jsonPath("$.numberTrain").value(DEFAULT_NUMBER_TRAIN));
    }

    @Test
    @Transactional
    public void getNonExistingTrain() throws Exception {
        // Get the train
        restTrainMockMvc.perform(get("/api/trains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrain() throws Exception {
        // Initialize the database
        trainRepository.saveAndFlush(train);

        int databaseSizeBeforeUpdate = trainRepository.findAll().size();

        // Update the train
        Train updatedTrain = trainRepository.findById(train.getId()).get();
        // Disconnect from session so that the updates on updatedTrain are not directly saved in db
        em.detach(updatedTrain);
        updatedTrain
            .countPassengers(UPDATED_COUNT_PASSENGERS)
            .numberTrain(UPDATED_NUMBER_TRAIN);
        TrainDTO trainDTO = trainMapper.toDto(updatedTrain);

        restTrainMockMvc.perform(put("/api/trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainDTO)))
            .andExpect(status().isOk());

        // Validate the Train in the database
        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeUpdate);
        Train testTrain = trainList.get(trainList.size() - 1);
        assertThat(testTrain.getCountPassengers()).isEqualTo(UPDATED_COUNT_PASSENGERS);
        assertThat(testTrain.getNumberTrain()).isEqualTo(UPDATED_NUMBER_TRAIN);
    }

    @Test
    @Transactional
    public void updateNonExistingTrain() throws Exception {
        int databaseSizeBeforeUpdate = trainRepository.findAll().size();

        // Create the Train
        TrainDTO trainDTO = trainMapper.toDto(train);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainMockMvc.perform(put("/api/trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Train in the database
        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrain() throws Exception {
        // Initialize the database
        trainRepository.saveAndFlush(train);

        int databaseSizeBeforeDelete = trainRepository.findAll().size();

        // Delete the train
        restTrainMockMvc.perform(delete("/api/trains/{id}", train.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Train.class);
        Train train1 = new Train();
        train1.setId(1L);
        Train train2 = new Train();
        train2.setId(train1.getId());
        assertThat(train1).isEqualTo(train2);
        train2.setId(2L);
        assertThat(train1).isNotEqualTo(train2);
        train1.setId(null);
        assertThat(train1).isNotEqualTo(train2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainDTO.class);
        TrainDTO trainDTO1 = new TrainDTO();
        trainDTO1.setId(1L);
        TrainDTO trainDTO2 = new TrainDTO();
        assertThat(trainDTO1).isNotEqualTo(trainDTO2);
        trainDTO2.setId(trainDTO1.getId());
        assertThat(trainDTO1).isEqualTo(trainDTO2);
        trainDTO2.setId(2L);
        assertThat(trainDTO1).isNotEqualTo(trainDTO2);
        trainDTO1.setId(null);
        assertThat(trainDTO1).isNotEqualTo(trainDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(trainMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(trainMapper.fromId(null)).isNull();
    }
}
