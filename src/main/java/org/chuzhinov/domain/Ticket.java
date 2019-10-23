package org.chuzhinov.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Ticket.
 */
@Entity
@Table(name = "ticket")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ticket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "register_date", nullable = false)
    private LocalDate registerDate;

    @ManyToOne
    @JsonIgnoreProperties("tickets")
    private Passenger passenger;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("tickets")
    private Train train;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getRegisterDate() {
        return registerDate;
    }

    public Ticket registerDate(LocalDate registerDate) {
        this.registerDate = registerDate;
        return this;
    }

    public void setRegisterDate(LocalDate registerDate) {
        this.registerDate = registerDate;
    }

    public Passenger getPassenger() {
        return passenger;
    }

    public Ticket passenger(Passenger passenger) {
        this.passenger = passenger;
        return this;
    }

    public void setPassenger(Passenger passenger) {
        this.passenger = passenger;
    }

    public Train getTrain() {
        return train;
    }

    public Ticket train(Train train) {
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
        if (!(o instanceof Ticket)) {
            return false;
        }
        return id != null && id.equals(((Ticket) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Ticket{" +
            "id=" + getId() +
            ", registerDate='" + getRegisterDate() + "'" +
            "}";
    }
}
