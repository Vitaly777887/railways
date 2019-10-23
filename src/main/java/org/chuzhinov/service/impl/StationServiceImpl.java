package org.chuzhinov.service.impl;

import org.chuzhinov.service.StationService;
import org.chuzhinov.domain.Station;
import org.chuzhinov.repository.StationRepository;
import org.chuzhinov.service.dto.StationDTO;
import org.chuzhinov.service.mapper.StationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Station}.
 */
@Service
@Transactional
public class StationServiceImpl implements StationService {

    private final Logger log = LoggerFactory.getLogger(StationServiceImpl.class);

    private final StationRepository stationRepository;

    private final StationMapper stationMapper;

    public StationServiceImpl(StationRepository stationRepository, StationMapper stationMapper) {
        this.stationRepository = stationRepository;
        this.stationMapper = stationMapper;
    }

    /**
     * Save a station.
     *
     * @param stationDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public StationDTO save(StationDTO stationDTO) {
        log.debug("Request to save Station : {}", stationDTO);
        Station station = stationMapper.toEntity(stationDTO);
        station = stationRepository.save(station);
        return stationMapper.toDto(station);
    }

    /**
     * Get all the stations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Stations");
        return stationRepository.findAll(pageable)
            .map(stationMapper::toDto);
    }


    /**
     * Get one station by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StationDTO> findOne(Long id) {
        log.debug("Request to get Station : {}", id);
        return stationRepository.findById(id)
            .map(stationMapper::toDto);
    }

    /**
     * Delete the station by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Station : {}", id);
        stationRepository.deleteById(id);
    }
}
