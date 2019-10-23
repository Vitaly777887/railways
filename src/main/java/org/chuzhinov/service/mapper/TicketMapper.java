package org.chuzhinov.service.mapper;

import org.chuzhinov.domain.*;
import org.chuzhinov.service.dto.TicketDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Ticket} and its DTO {@link TicketDTO}.
 */
@Mapper(componentModel = "spring", uses = {PassengerMapper.class, TrainMapper.class})
public interface TicketMapper extends EntityMapper<TicketDTO, Ticket> {

    @Mapping(source = "passenger.id", target = "passengerId")
    @Mapping(source = "train.id", target = "trainId")
    @Mapping(source = "train.name", target = "trainName")
    TicketDTO toDto(Ticket ticket);

    @Mapping(source = "passengerId", target = "passenger")
    @Mapping(source = "trainId", target = "train")
    Ticket toEntity(TicketDTO ticketDTO);

    default Ticket fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ticket ticket = new Ticket();
        ticket.setId(id);
        return ticket;
    }
}
