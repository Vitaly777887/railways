package org.chuzhinov.repository;
import org.chuzhinov.domain.Station;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Station entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StationRepository extends JpaRepository<Station, Long> {

}
