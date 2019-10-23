package org.chuzhinov.web.rest;

import org.chuzhinov.service.StationTrainService;
import org.chuzhinov.web.rest.errors.BadRequestAlertException;
import org.chuzhinov.service.dto.StationTrainDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.chuzhinov.domain.StationTrain}.
 */
@RestController
@RequestMapping("/api")
public class StationTrainResource {

    private final Logger log = LoggerFactory.getLogger(StationTrainResource.class);

    private static final String ENTITY_NAME = "stationTrain";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StationTrainService stationTrainService;

    public StationTrainResource(StationTrainService stationTrainService) {
        this.stationTrainService = stationTrainService;
    }

    /**
     * {@code POST  /station-trains} : Create a new stationTrain.
     *
     * @param stationTrainDTO the stationTrainDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stationTrainDTO, or with status {@code 400 (Bad Request)} if the stationTrain has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/station-trains")
    public ResponseEntity<StationTrainDTO> createStationTrain(@Valid @RequestBody StationTrainDTO stationTrainDTO) throws URISyntaxException {
        log.debug("REST request to save StationTrain : {}", stationTrainDTO);
        if (stationTrainDTO.getId() != null) {
            throw new BadRequestAlertException("A new stationTrain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StationTrainDTO result = stationTrainService.save(stationTrainDTO);
        return ResponseEntity.created(new URI("/api/station-trains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /station-trains} : Updates an existing stationTrain.
     *
     * @param stationTrainDTO the stationTrainDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stationTrainDTO,
     * or with status {@code 400 (Bad Request)} if the stationTrainDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stationTrainDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/station-trains")
    public ResponseEntity<StationTrainDTO> updateStationTrain(@Valid @RequestBody StationTrainDTO stationTrainDTO) throws URISyntaxException {
        log.debug("REST request to update StationTrain : {}", stationTrainDTO);
        if (stationTrainDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StationTrainDTO result = stationTrainService.save(stationTrainDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stationTrainDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /station-trains} : get all the stationTrains.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stationTrains in body.
     */
    @GetMapping("/station-trains")
    public ResponseEntity<List<StationTrainDTO>> getAllStationTrains(Pageable pageable) {
        log.debug("REST request to get a page of StationTrains");
        Page<StationTrainDTO> page = stationTrainService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /station-trains/:id} : get the "id" stationTrain.
     *
     * @param id the id of the stationTrainDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stationTrainDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/station-trains/{id}")
    public ResponseEntity<StationTrainDTO> getStationTrain(@PathVariable Long id) {
        log.debug("REST request to get StationTrain : {}", id);
        Optional<StationTrainDTO> stationTrainDTO = stationTrainService.findOne(id);
        return ResponseUtil.wrapOrNotFound(stationTrainDTO);
    }

    /**
     * {@code DELETE  /station-trains/:id} : delete the "id" stationTrain.
     *
     * @param id the id of the stationTrainDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/station-trains/{id}")
    public ResponseEntity<Void> deleteStationTrain(@PathVariable Long id) {
        log.debug("REST request to delete StationTrain : {}", id);
        stationTrainService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
