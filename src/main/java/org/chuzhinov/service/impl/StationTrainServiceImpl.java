package org.chuzhinov.service.impl;

import org.chuzhinov.service.StationTrainService;
import org.chuzhinov.domain.StationTrain;
import org.chuzhinov.repository.StationTrainRepository;
import org.chuzhinov.service.dto.StationTrainDTO;
import org.chuzhinov.service.mapper.StationTrainMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link StationTrain}.
 */
@Service
@Transactional
public class StationTrainServiceImpl implements StationTrainService {

    private final Logger log = LoggerFactory.getLogger(StationTrainServiceImpl.class);

    private final StationTrainRepository stationTrainRepository;

    private final StationTrainMapper stationTrainMapper;

    public StationTrainServiceImpl(StationTrainRepository stationTrainRepository, StationTrainMapper stationTrainMapper) {
        this.stationTrainRepository = stationTrainRepository;
        this.stationTrainMapper = stationTrainMapper;
    }

    /**
     * Save a stationTrain.
     *
     * @param stationTrainDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public StationTrainDTO save(StationTrainDTO stationTrainDTO) {
        log.debug("Request to save StationTrain : {}", stationTrainDTO);
        StationTrain stationTrain = stationTrainMapper.toEntity(stationTrainDTO);
        stationTrain = stationTrainRepository.save(stationTrain);
        return stationTrainMapper.toDto(stationTrain);
    }

    /**
     * Get all the stationTrains.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StationTrainDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StationTrains");
        return stationTrainRepository.findAll(pageable)
            .map(stationTrainMapper::toDto);
    }


    /**
     * Get one stationTrain by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StationTrainDTO> findOne(Long id) {
        log.debug("Request to get StationTrain : {}", id);
        return stationTrainRepository.findById(id)
            .map(stationTrainMapper::toDto);
    }

    /**
     * Delete the stationTrain by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StationTrain : {}", id);
        stationTrainRepository.deleteById(id);
    }
}
