package org.chuzhinov.service.impl;

import org.chuzhinov.service.PassengerService;
import org.chuzhinov.domain.Passenger;
import org.chuzhinov.repository.PassengerRepository;
import org.chuzhinov.service.dto.PassengerDTO;
import org.chuzhinov.service.mapper.PassengerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Passenger}.
 */
@Service
@Transactional
public class PassengerServiceImpl implements PassengerService {

    private final Logger log = LoggerFactory.getLogger(PassengerServiceImpl.class);

    private final PassengerRepository passengerRepository;

    private final PassengerMapper passengerMapper;

    public PassengerServiceImpl(PassengerRepository passengerRepository, PassengerMapper passengerMapper) {
        this.passengerRepository = passengerRepository;
        this.passengerMapper = passengerMapper;
    }

    /**
     * Save a passenger.
     *
     * @param passengerDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PassengerDTO save(PassengerDTO passengerDTO) {
        log.debug("Request to save Passenger : {}", passengerDTO);
        Passenger passenger = passengerMapper.toEntity(passengerDTO);
        passenger = passengerRepository.save(passenger);
        return passengerMapper.toDto(passenger);
    }

    /**
     * Get all the passengers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PassengerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Passengers");
        return passengerRepository.findAll(pageable)
            .map(passengerMapper::toDto);
    }


    /**
     * Get one passenger by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PassengerDTO> findOne(Long id) {
        log.debug("Request to get Passenger : {}", id);
        return passengerRepository.findById(id)
            .map(passengerMapper::toDto);
    }

    /**
     * Delete the passenger by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Passenger : {}", id);
        passengerRepository.deleteById(id);
    }
}
