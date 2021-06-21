package edu.robocode.service.core

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RobotsDefinitionRepository : JpaRepository<RobotDefinition, Long>