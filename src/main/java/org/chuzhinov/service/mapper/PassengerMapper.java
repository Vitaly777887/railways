package org.chuzhinov.service.mapper;

import org.chuzhinov.domain.*;
import org.chuzhinov.service.dto.PassengerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Passenger} and its DTO {@link PassengerDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PassengerMapper extends EntityMapper<PassengerDTO, Passenger> {


    @Mapping(target = "tickets", ignore = true)
    @Mapping(target = "removeTicket", ignore = true)
    Passenger toEntity(PassengerDTO passengerDTO);

    default Passenger fromId(Long id) {
        if (id == null) {
            return null;
        }
        Passenger passenger = new Passenger();
        passenger.setId(id);
        return passenger;
    }
}
