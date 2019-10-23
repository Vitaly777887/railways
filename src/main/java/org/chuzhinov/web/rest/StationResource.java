package org.chuzhinov.web.rest;

import org.chuzhinov.service.StationService;
import org.chuzhinov.web.rest.errors.BadRequestAlertException;
import org.chuzhinov.service.dto.StationDTO;

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
 * REST controller for managing {@link org.chuzhinov.domain.Station}.
 */
@RestController
@RequestMapping("/api")
public class StationResource {

    private final Logger log = LoggerFactory.getLogger(StationResource.class);

    private static final String ENTITY_NAME = "station";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StationService stationService;

    public StationResource(StationService stationService) {
        this.stationService = stationService;
    }

    /**
     * {@code POST  /stations} : Create a new station.
     *
     * @param stationDTO the stationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stationDTO, or with status {@code 400 (Bad Request)} if the station has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stations")
    public ResponseEntity<StationDTO> createStation(@Valid @RequestBody StationDTO stationDTO) throws URISyntaxException {
        log.debug("REST request to save Station : {}", stationDTO);
        if (stationDTO.getId() != null) {
            throw new BadRequestAlertException("A new station cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StationDTO result = stationService.save(stationDTO);
        return ResponseEntity.created(new URI("/api/stations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stations} : Updates an existing station.
     *
     * @param stationDTO the stationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stationDTO,
     * or with status {@code 400 (Bad Request)} if the stationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stations")
    public ResponseEntity<StationDTO> updateStation(@Valid @RequestBody StationDTO stationDTO) throws URISyntaxException {
        log.debug("REST request to update Station : {}", stationDTO);
        if (stationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StationDTO result = stationService.save(stationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /stations} : get all the stations.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stations in body.
     */
    @GetMapping("/stations")
    public ResponseEntity<List<StationDTO>> getAllStations(Pageable pageable) {
        log.debug("REST request to get a page of Stations");
        Page<StationDTO> page = stationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /stations/:id} : get the "id" station.
     *
     * @param id the id of the stationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stations/{id}")
    public ResponseEntity<StationDTO> getStation(@PathVariable Long id) {
        log.debug("REST request to get Station : {}", id);
        Optional<StationDTO> stationDTO = stationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(stationDTO);
    }

    /**
     * {@code DELETE  /stations/:id} : delete the "id" station.
     *
     * @param id the id of the stationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stations/{id}")
    public ResponseEntity<Void> deleteStation(@PathVariable Long id) {
        log.debug("REST request to delete Station : {}", id);
        stationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
