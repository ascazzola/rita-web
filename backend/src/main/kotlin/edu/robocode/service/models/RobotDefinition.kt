package edu.robocode.service.models

import java.util.*

interface IEntityModel {
    val id: UUID?;
    val version: Long;
}
data class RobotDefinitionModel(
    override val id: UUID?,
    val name: String,
    val code: String,
    val xml: String,
    override val version: Long = 0,
    val compiled: Boolean = false,
    val fileId: String? = null,
) : IEntityModel