package edu.robocode.service.core

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface RobotsDefinitionRepository : JpaRepository<RobotDefinition, UUID>