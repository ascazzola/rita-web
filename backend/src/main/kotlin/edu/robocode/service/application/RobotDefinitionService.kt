package edu.robocode.service.application

import edu.robocode.service.core.IRobotsDefinitionRepository
import edu.robocode.service.core.RobotDefinition
import edu.robocode.service.models.RobotDefinitionModel
import javassist.NotFoundException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*
import java.util.regex.Pattern
import javax.persistence.OptimisticLockException


@Service
class RobotDefinitionService(
    private val compilerService: IJavaCompilerService,
    private val fileStore: IFileStore,
    private val repository: IRobotsDefinitionRepository,
    private val mapper: IMapper<RobotDefinition, RobotDefinitionModel>
    )
    : IRobotDefinitionsService {
    private val logger: Logger = LoggerFactory.getLogger(RobotDefinitionService::class.java)

    override fun getAll(userId: String): List<RobotDefinitionModel> =
        repository.findByUserName(userId).map { x -> mapper.map(x) }

    override fun getById(id: UUID): Optional<RobotDefinitionModel> =
        repository.findById(id).map { robotDefinition ->
            Optional.of(mapper.map(robotDefinition))}
            .orElse(Optional.empty())

    override fun create(userId: String, model: RobotDefinitionModel): RobotDefinitionModel {
        val (className, compiled, fileId) = persistCompiledRobot(model)

        val entity = RobotDefinition(userId, className, model.code, model.xml, compiled, fileId)
        repository.save(entity)
        return mapper.map(entity)
    }

    override fun update(model: RobotDefinitionModel):  Optional<RobotDefinitionModel> =
        repository.findById(model.id!!)
            .map { entity ->
                if (entity.version != model.version) {
                    throw OptimisticLockException()
                }
                entity.xml = model.xml
                entity.code = model.code

                val (className, compiled, fileId) = persistCompiledRobot(model)
                entity.name = className
                entity.compiled = compiled
                entity.fileId = fileId
                Optional.of(mapper.map(repository.save(entity)))
            }
            .orElse(Optional.empty())

    override fun delete(id: UUID) {
        val definition = repository.findById(id)
        if (!definition.isPresent) {
            throw NotFoundException("Robot definition not found with id $id")
        }
        repository.delete(definition.get())
    }

    private fun persistCompiledRobot(model: RobotDefinitionModel): Triple<String, Boolean, String?> {
        val pattern = Pattern.compile("(?<=\n|\\A)(?:public\\s)?(class)\\s([^\n\\s]*)")
        val matcher = pattern.matcher(model.code)
        var className = model.name
        var compiled = false
        var fileId = model.fileId
        if (matcher.find() && matcher.groupCount() == 2) {
            try {
                className = matcher.group(2)
                val result = compilerService.compile(className, model.code)
                fileId = model.fileId ?: UUID.randomUUID().toString()
                fileStore.put(fileId, result.stream, result.size)
                compiled = true
            } catch (e: Exception) {
                logger.error(
                    "An exception occurred compiling robot. ${model.name} with code = ${model.code}",
                    e
                );
            }
        }
        return Triple(className, compiled,fileId)
    }
}