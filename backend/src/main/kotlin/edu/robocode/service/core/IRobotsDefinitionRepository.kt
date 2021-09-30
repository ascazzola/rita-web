package edu.robocode.service.core

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface IRobotsDefinitionRepository : CrudRepository<RobotDefinition, UUID> {
    @Query("SELECT r FROM RobotDefinition r WHERE r.userId = ?1")
    fun findByUserName(userName: String): List<RobotDefinition>
}