package org.chuzhinov.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Station.
 */
@Entity
@Table(name = "station")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Station implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "station")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StationTrain> stationTrains = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Station name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<StationTrain> getStationTrains() {
        return stationTrains;
    }

    public Station stationTrains(Set<StationTrain> stationTrains) {
        this.stationTrains = stationTrains;
        return this;
    }

    public Station addStationTrain(StationTrain stationTrain) {
        this.stationTrains.add(stationTrain);
        stationTrain.setStation(this);
        return this;
    }

    public Station removeStationTrain(StationTrain stationTrain) {
        this.stationTrains.remove(stationTrain);
        stationTrain.setStation(null);
        return this;
    }

    public void setStationTrains(Set<StationTrain> stationTrains) {
        this.stationTrains = stationTrains;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Station)) {
            return false;
        }
        return id != null && id.equals(((Station) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Station{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
