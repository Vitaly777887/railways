package org.chuzhinov.repository;
import org.chuzhinov.domain.StationTrain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StationTrain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StationTrainRepository extends JpaRepository<StationTrain, Long> {

}
