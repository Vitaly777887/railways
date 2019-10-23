package org.chuzhinov.service.mapper;

import org.chuzhinov.domain.*;
import org.chuzhinov.service.dto.StationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Station} and its DTO {@link StationDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StationMapper extends EntityMapper<StationDTO, Station> {


    @Mapping(target = "stationTrains", ignore = true)
    @Mapping(target = "removeStationTrain", ignore = true)
    Station toEntity(StationDTO stationDTO);

    default Station fromId(Long id) {
        if (id == null) {
            return null;
        }
        Station station = new Station();
        station.setId(id);
        return station;
    }
}
