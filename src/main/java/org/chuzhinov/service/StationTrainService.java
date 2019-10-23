package org.chuzhinov.service;

import org.chuzhinov.service.dto.StationTrainDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link org.chuzhinov.domain.StationTrain}.
 */
public interface StationTrainService {

    /**
     * Save a stationTrain.
     *
     * @param stationTrainDTO the entity to save.
     * @return the persisted entity.
     */
    StationTrainDTO save(StationTrainDTO stationTrainDTO);

    /**
     * Get all the stationTrains.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StationTrainDTO> findAll(Pageable pageable);


    /**
     * Get the "id" stationTrain.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StationTrainDTO> findOne(Long id);

    /**
     * Delete the "id" stationTrain.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
