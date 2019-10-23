package org.chuzhinov.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link org.chuzhinov.domain.Train} entity.
 */
public class TrainDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer countPassengers;

    @NotNull
    private Integer numberTrain;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCountPassengers() {
        return countPassengers;
    }

    public void setCountPassengers(Integer countPassengers) {
        this.countPassengers = countPassengers;
    }

    public Integer getNumberTrain() {
        return numberTrain;
    }

    public void setNumberTrain(Integer numberTrain) {
        this.numberTrain = numberTrain;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TrainDTO trainDTO = (TrainDTO) o;
        if (trainDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), trainDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TrainDTO{" +
            "id=" + getId() +
            ", countPassengers=" + getCountPassengers() +
            ", numberTrain=" + getNumberTrain() +
            "}";
    }
}
