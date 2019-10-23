package org.chuzhinov.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Train.
 */
@Entity
@Table(name = "train")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Train implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "count_passengers", nullable = false)
    private Integer countPassengers;

    @NotNull
    @Column(name = "number_train", nullable = false)
    private Integer numberTrain;

    @OneToMany(mappedBy = "train")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StationTrain> stationTrains = new HashSet<>();

    @OneToMany(mappedBy = "train")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ticket> tickets = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCountPassengers() {
        return countPassengers;
    }

    public Train countPassengers(Integer countPassengers) {
        this.countPassengers = countPassengers;
        return this;
    }

    public void setCountPassengers(Integer countPassengers) {
        this.countPassengers = countPassengers;
    }

    public Integer getNumberTrain() {
        return numberTrain;
    }

    public Train numberTrain(Integer numberTrain) {
        this.numberTrain = numberTrain;
        return this;
    }

    public void setNumberTrain(Integer numberTrain) {
        this.numberTrain = numberTrain;
    }

    public Set<StationTrain> getStationTrains() {
        return stationTrains;
    }

    public Train stationTrains(Set<StationTrain> stationTrains) {
        this.stationTrains = stationTrains;
        return this;
    }

    public Train addStationTrain(StationTrain stationTrain) {
        this.stationTrains.add(stationTrain);
        stationTrain.setTrain(this);
        return this;
    }

    public Train removeStationTrain(StationTrain stationTrain) {
        this.stationTrains.remove(stationTrain);
        stationTrain.setTrain(null);
        return this;
    }

    public void setStationTrains(Set<StationTrain> stationTrains) {
        this.stationTrains = stationTrains;
    }

    public Set<Ticket> getTickets() {
        return tickets;
    }

    public Train tickets(Set<Ticket> tickets) {
        this.tickets = tickets;
        return this;
    }

    public Train addTicket(Ticket ticket) {
        this.tickets.add(ticket);
        ticket.setTrain(this);
        return this;
    }

    public Train removeTicket(Ticket ticket) {
        this.tickets.remove(ticket);
        ticket.setTrain(null);
        return this;
    }

    public void setTickets(Set<Ticket> tickets) {
        this.tickets = tickets;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Train)) {
            return false;
        }
        return id != null && id.equals(((Train) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Train{" +
            "id=" + getId() +
            ", countPassengers=" + getCountPassengers() +
            ", numberTrain=" + getNumberTrain() +
            "}";
    }
}
