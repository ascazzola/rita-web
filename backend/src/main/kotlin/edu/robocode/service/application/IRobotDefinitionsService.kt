package edu.robocode.service.application

import edu.robocode.service.models.RobotDefinitionModel
import java.util.*

interface IRobotDefinitionsService {
    fun getAll(userId: String): List<RobotDefinitionModel>
    fun getById(id: UUID): Optional<RobotDefinitionModel>
    fun create(userId: String, model: RobotDefinitionModel): RobotDefinitionModel
    fun update(model: RobotDefinitionModel): Optional<RobotDefinitionModel>
    fun delete(id: UUID)
}