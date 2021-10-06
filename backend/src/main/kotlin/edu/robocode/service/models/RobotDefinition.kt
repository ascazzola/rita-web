package edu.robocode.service.models

import java.util.*

interface IEntityModel {
    val id: UUID?;
    val version: Long;
}
data class RobotDefinitionModel(
    override val id: UUID?,
    override val version: Long,
    val name: String,
    val code: String,
    val xml: String
) : IEntityModel