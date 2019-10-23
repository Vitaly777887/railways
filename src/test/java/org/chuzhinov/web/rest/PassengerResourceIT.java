package org.chuzhinov.web.rest;

import org.chuzhinov.RailwaysApp;
import org.chuzhinov.domain.Passenger;
import org.chuzhinov.repository.PassengerRepository;
import org.chuzhinov.service.PassengerService;
import org.chuzhinov.service.dto.PassengerDTO;
import org.chuzhinov.service.mapper.PassengerMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.chuzhinov.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PassengerResource} REST controller.
 */
@SpringBootTest(classes = RailwaysApp.class)
public class PassengerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTHDAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTHDAY = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private PassengerMapper passengerMapper;

    @Autowired
    private PassengerService passengerService;

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

    private MockMvc restPassengerMockMvc;

    private Passenger passenger;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PassengerResource passengerResource = new PassengerResource(passengerService);
        this.restPassengerMockMvc = MockMvcBuilders.standaloneSetup(passengerResource)
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
    public static Passenger createEntity(EntityManager em) {
        Passenger passenger = new Passenger()
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .birthday(DEFAULT_BIRTHDAY);
        return passenger;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Passenger createUpdatedEntity(EntityManager em) {
        Passenger passenger = new Passenger()
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .birthday(UPDATED_BIRTHDAY);
        return passenger;
    }

    @BeforeEach
    public void initTest() {
        passenger = createEntity(em);
    }

    @Test
    @Transactional
    public void createPassenger() throws Exception {
        int databaseSizeBeforeCreate = passengerRepository.findAll().size();

        // Create the Passenger
        PassengerDTO passengerDTO = passengerMapper.toDto(passenger);
        restPassengerMockMvc.perform(post("/api/passengers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passengerDTO)))
            .andExpect(status().isCreated());

        // Validate the Passenger in the database
        List<Passenger> passengerList = passengerRepository.findAll();
        assertThat(passengerList).hasSize(databaseSizeBeforeCreate + 1);
        Passenger testPassenger = passengerList.get(passengerList.size() - 1);
        assertThat(testPassenger.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPassenger.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testPassenger.getBirthday()).isEqualTo(DEFAULT_BIRTHDAY);
    }

    @Test
    @Transactional
    public void createPassengerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = passengerRepository.findAll().size();

        // Create the Passenger with an existing ID
        passenger.setId(1L);
        PassengerDTO passengerDTO = passengerMapper.toDto(passenger);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPassengerMockMvc.perform(post("/api/passengers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passengerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Passenger in the database
        List<Passenger> passengerList = passengerRepository.findAll();
        assertThat(passengerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = passengerRepository.findAll().size();
        // set the field null
        passenger.setName(null);

        // Create the Passenger, which fails.
        PassengerDTO passengerDTO = passengerMapper.toDto(passenger);

        restPassengerMockMvc.perform(post("/api/passengers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passengerDTO)))
            .andExpect(status().isBadRequest());

        List<Passenger> passengerList = passengerRepository.findAll();
        assertThat(passengerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSurnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = passengerRepository.findAll().size();
        // set the field null
        passenger.setSurname(null);

        // Create the Passenger, which fails.
        PassengerDTO passengerDTO = passengerMapper.toDto(passenger);

        restPassengerMockMvc.perform(post("/api/passengers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passengerDTO)))
            .andExpect(status().isBadRequest());

        List<Passenger> passengerList = passengerRepository.findAll();
        assertThat(passengerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBirthdayIsRequired() throws Exception {
        int databaseSizeBeforeTest = passengerRepository.findAll().size();
        // set the field null
        passenger.setBirthday(null);

        // Create the Passenger, which fails.
        PassengerDTO passengerDTO = passengerMapper.toDto(passenger);

        restPassengerMockMvc.perform(post("/api/passengers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passengerDTO)))
            .andExpect(status().isBadRequest());

        List<Passenger> passengerList = passengerRepository.findAll();
        assertThat(passengerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPassengers() throws Exception {
        // Initialize the database
        passengerRepository.saveAndFlush(passenger);

        // Get all the passengerList
        restPassengerMockMvc.perform(get("/api/passengers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(passenger.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME)))
            .andExpect(jsonPath("$.[*].birthday").value(hasItem(DEFAULT_BIRTHDAY.toString())));
    }
    
    @Test
    @Transactional
    public void getPassenger() throws Exception {
        // Initialize the database
        passengerRepository.saveAndFlush(passenger);

        // Get the passenger
        restPassengerMockMvc.perform(get("/api/passengers/{id}", passenger.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(passenger.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME))
            .andExpect(jsonPath("$.birthday").value(DEFAULT_BIRTHDAY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPassenger() throws Exception {
        // Get the passenger
        restPassengerMockMvc.perform(get("/api/passengers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePassenger() throws Exception {
        // Initialize the database
        passengerRepository.saveAndFlush(passenger);

        int databaseSizeBeforeUpdate = passengerRepository.findAll().size();

        // Update the passenger
        Passenger updatedPassenger = passengerRepository.findById(passenger.getId()).get();
        // Disconnect from session so that the updates on updatedPassenger are not directly saved in db
        em.detach(updatedPassenger);
        updatedPassenger
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .birthday(UPDATED_BIRTHDAY);
        PassengerDTO passengerDTO = passengerMapper.toDto(updatedPassenger);

        restPassengerMockMvc.perform(put("/api/passengers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passengerDTO)))
            .andExpect(status().isOk());

        // Validate the Passenger in the database
        List<Passenger> passengerList = passengerRepository.findAll();
        assertThat(passengerList).hasSize(databaseSizeBeforeUpdate);
        Passenger testPassenger = passengerList.get(passengerList.size() - 1);
        assertThat(testPassenger.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPassenger.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testPassenger.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
    }

    @Test
    @Transactional
    public void updateNonExistingPassenger() throws Exception {
        int databaseSizeBeforeUpdate = passengerRepository.findAll().size();

        // Create the Passenger
        PassengerDTO passengerDTO = passengerMapper.toDto(passenger);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPassengerMockMvc.perform(put("/api/passengers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passengerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Passenger in the database
        List<Passenger> passengerList = passengerRepository.findAll();
        assertThat(passengerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePassenger() throws Exception {
        // Initialize the database
        passengerRepository.saveAndFlush(passenger);

        int databaseSizeBeforeDelete = passengerRepository.findAll().size();

        // Delete the passenger
        restPassengerMockMvc.perform(delete("/api/passengers/{id}", passenger.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Passenger> passengerList = passengerRepository.findAll();
        assertThat(passengerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Passenger.class);
        Passenger passenger1 = new Passenger();
        passenger1.setId(1L);
        Passenger passenger2 = new Passenger();
        passenger2.setId(passenger1.getId());
        assertThat(passenger1).isEqualTo(passenger2);
        passenger2.setId(2L);
        assertThat(passenger1).isNotEqualTo(passenger2);
        passenger1.setId(null);
        assertThat(passenger1).isNotEqualTo(passenger2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PassengerDTO.class);
        PassengerDTO passengerDTO1 = new PassengerDTO();
        passengerDTO1.setId(1L);
        PassengerDTO passengerDTO2 = new PassengerDTO();
        assertThat(passengerDTO1).isNotEqualTo(passengerDTO2);
        passengerDTO2.setId(passengerDTO1.getId());
        assertThat(passengerDTO1).isEqualTo(passengerDTO2);
        passengerDTO2.setId(2L);
        assertThat(passengerDTO1).isNotEqualTo(passengerDTO2);
        passengerDTO1.setId(null);
        assertThat(passengerDTO1).isNotEqualTo(passengerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(passengerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(passengerMapper.fromId(null)).isNull();
    }
}
