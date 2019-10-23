package org.chuzhinov.service.mapper;

import org.chuzhinov.domain.*;
import org.chuzhinov.service.dto.StationTrainDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link StationTrain} and its DTO {@link StationTrainDTO}.
 */
@Mapper(componentModel = "spring", uses = {StationMapper.class, TrainMapper.class})
public interface StationTrainMapper extends EntityMapper<StationTrainDTO, StationTrain> {

    @Mapping(source = "station.id", target = "stationId")
    @Mapping(source = "station.name", target = "stationName")
    @Mapping(source = "train.id", target = "trainId")
    @Mapping(source = "train.name", target = "trainName")
    StationTrainDTO toDto(StationTrain stationTrain);

    @Mapping(source = "stationId", target = "station")
    @Mapping(source = "trainId", target = "train")
    StationTrain toEntity(StationTrainDTO stationTrainDTO);

    default StationTrain fromId(Long id) {
        if (id == null) {
            return null;
        }
        StationTrain stationTrain = new StationTrain();
        stationTrain.setId(id);
        return stationTrain;
    }
}
