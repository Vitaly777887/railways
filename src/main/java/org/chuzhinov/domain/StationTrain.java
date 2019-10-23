package org.chuzhinov.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A StationTrain.
 */
@Entity
@Table(name = "station_train")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StationTrain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "arrival_time", nullable = false)
    private ZonedDateTime arrivalTime;

    @NotNull
    @Column(name = "departure_time", nullable = false)
    private ZonedDateTime departureTime;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("stationTrains")
    private Station station;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("stationTrains")
    private Train train;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getArrivalTime() {
        return arrivalTime;
    }

    public StationTrain arrivalTime(ZonedDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
        return this;
    }

    public void setArrivalTime(ZonedDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public ZonedDateTime getDepartureTime() {
        return departureTime;
    }

    public StationTrain departureTime(ZonedDateTime departureTime) {
        this.departureTime = departureTime;
        return this;
    }

    public void setDepartureTime(ZonedDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public Station getStation() {
        return station;
    }

    public StationTrain station(Station station) {
        this.station = station;
        return this;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    public Train getTrain() {
        return train;
    }

    public StationTrain train(Train train) {
        this.train = train;
        return this;
    }

    public void setTrain(Train train) {
        this.train = train;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StationTrain)) {
            return false;
        }
        return id != null && id.equals(((StationTrain) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StationTrain{" +
            "id=" + getId() +
            ", arrivalTime='" + getArrivalTime() + "'" +
            ", departureTime='" + getDepartureTime() + "'" +
            "}";
    }
}
