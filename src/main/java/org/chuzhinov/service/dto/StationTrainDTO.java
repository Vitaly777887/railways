package org.chuzhinov.service.dto;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link org.chuzhinov.domain.StationTrain} entity.
 */
public class StationTrainDTO implements Serializable {

    private Long id;

    @NotNull
    private ZonedDateTime arrivalTime;

    @NotNull
    private ZonedDateTime departureTime;


    private Long stationId;

    private String stationName;

    private Long trainId;

    private String trainName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(ZonedDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public ZonedDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(ZonedDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public Long getStationId() {
        return stationId;
    }

    public void setStationId(Long stationId) {
        this.stationId = stationId;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public Long getTrainId() {
        return trainId;
    }

    public void setTrainId(Long trainId) {
        this.trainId = trainId;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StationTrainDTO stationTrainDTO = (StationTrainDTO) o;
        if (stationTrainDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stationTrainDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StationTrainDTO{" +
            "id=" + getId() +
            ", arrivalTime='" + getArrivalTime() + "'" +
            ", departureTime='" + getDepartureTime() + "'" +
            ", station=" + getStationId() +
            ", station='" + getStationName() + "'" +
            ", train=" + getTrainId() +
            ", train='" + getTrainName() + "'" +
            "}";
    }
}
