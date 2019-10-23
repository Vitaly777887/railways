package org.chuzhinov.service.impl;

import org.chuzhinov.service.TrainService;
import org.chuzhinov.domain.Train;
import org.chuzhinov.repository.TrainRepository;
import org.chuzhinov.service.dto.TrainDTO;
import org.chuzhinov.service.mapper.TrainMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Train}.
 */
@Service
@Transactional
public class TrainServiceImpl implements TrainService {

    private final Logger log = LoggerFactory.getLogger(TrainServiceImpl.class);

    private final TrainRepository trainRepository;

    private final TrainMapper trainMapper;

    public TrainServiceImpl(TrainRepository trainRepository, TrainMapper trainMapper) {
        this.trainRepository = trainRepository;
        this.trainMapper = trainMapper;
    }

    /**
     * Save a train.
     *
     * @param trainDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TrainDTO save(TrainDTO trainDTO) {
        log.debug("Request to save Train : {}", trainDTO);
        Train train = trainMapper.toEntity(trainDTO);
        train = trainRepository.save(train);
        return trainMapper.toDto(train);
    }

    /**
     * Get all the trains.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TrainDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Trains");
        return trainRepository.findAll(pageable)
            .map(trainMapper::toDto);
    }


    /**
     * Get one train by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TrainDTO> findOne(Long id) {
        log.debug("Request to get Train : {}", id);
        return trainRepository.findById(id)
            .map(trainMapper::toDto);
    }

    /**
     * Delete the train by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Train : {}", id);
        trainRepository.deleteById(id);
    }
}
