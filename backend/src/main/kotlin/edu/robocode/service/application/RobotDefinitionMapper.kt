package edu.robocode.service.application

import edu.robocode.service.core.RobotDefinition
import edu.robocode.service.models.RobotDefinitionModel
import org.springframework.stereotype.Service

@Service
class RobotDefinitionMapper : IMapper<RobotDefinition, RobotDefinitionModel> {
    override fun map (source: RobotDefinition): RobotDefinitionModel {
        return RobotDefinitionModel(source.id, source.name,
            source.code, source.xml, source.version!!, source.compiled, source.fileId)
    }

}