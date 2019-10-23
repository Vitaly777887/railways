package org.chuzhinov.service.mapper;

import org.chuzhinov.domain.*;
import org.chuzhinov.service.dto.TrainDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Train} and its DTO {@link TrainDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TrainMapper extends EntityMapper<TrainDTO, Train> {


    @Mapping(target = "stationTrains", ignore = true)
    @Mapping(target = "removeStationTrain", ignore = true)
    @Mapping(target = "tickets", ignore = true)
    @Mapping(target = "removeTicket", ignore = true)
    Train toEntity(TrainDTO trainDTO);

    default Train fromId(Long id) {
        if (id == null) {
            return null;
        }
        Train train = new Train();
        train.setId(id);
        return train;
    }
}
