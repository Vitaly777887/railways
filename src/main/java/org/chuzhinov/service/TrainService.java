package org.chuzhinov.service;

import org.chuzhinov.service.dto.TrainDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link org.chuzhinov.domain.Train}.
 */
public interface TrainService {

    /**
     * Save a train.
     *
     * @param trainDTO the entity to save.
     * @return the persisted entity.
     */
    TrainDTO save(TrainDTO trainDTO);

    /**
     * Get all the trains.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TrainDTO> findAll(Pageable pageable);


    /**
     * Get the "id" train.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TrainDTO> findOne(Long id);

    /**
     * Delete the "id" train.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
