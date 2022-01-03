package edu.robocode.service.application

import edu.robocode.service.config.RobocodeConfiguration
import org.springframework.stereotype.Service
import java.io.ByteArrayInputStream
import java.io.File
import java.io.InputStream
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.*
import kotlin.io.path.absolutePathString

@Service
class BattleWorkspaceFactory (
    val robotsDefinitionsService: IRobotDefinitionsService,
    val robocodeConfiguration: RobocodeConfiguration,
    val fileStore: IFileStore
) : IBattleWorkspaceFactory {

    private val examplePackageDirName = "sample"

    override fun create(preDefinedRobots: List<String>, robotsIds: List<UUID>?): BattleWorkspace {
        val userRobots = (robotsIds ?:  listOf()).associate { id -> getUserRobotData(id) }
        val sampleRobots = preDefinedRobots.associate { name -> getExampleRobotData(name)}

        val homePath = createRobocodeHomeWithFiles(userRobots, sampleRobots)

        val robotNames = preDefinedRobots.union(userRobots.keys.map { name -> "$name*" })

        return BattleWorkspace(homePath, ArrayList(robotNames))
    }

    private fun getUserRobotData(id: UUID) : Pair<String, InputStream> {
        var def = robotsDefinitionsService.getById(id).orElseThrow { Exception("Robot with id $id not found") }

        val name = def.name

        if (def.fileId == null) {
            throw Exception("Robot with id $id called ${def.name} does not compile")
        }

        val file = fileStore.get(def.fileId!!)
        return name to file
    }

    private fun getExampleRobotData(name: String) : Pair<String, InputStream> {
        val realName = name.substring(name.indexOf(".") + 1)
        val file = File("${robocodeConfiguration.examplesPath}/${realName}.class")
        val stream = ByteArrayInputStream(file.inputStream().readBytes())
        return realName to stream
    }

    //TODO refactor
    private fun createRobocodeHomeWithFiles(userFiles: Map<String, InputStream>, exampleFiles: Map<String, InputStream>)
    : String {
        val dir = Files.createTempDirectory("battle-workspace")
        val path = dir.absolutePathString()
        val robotsDir = File("${path}/robots")
        robotsDir.mkdirs()
        val robotsPath = robotsDir.absolutePath

        userFiles.forEach { (fileName, inputStream) ->
            val filePath = Paths.get("$robotsPath/$fileName.class");
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }

        if (exampleFiles.isNotEmpty()) {
            val packageDir = File("${robotsDir}/${examplePackageDirName}")
            packageDir.mkdirs()
            val destinationPath = packageDir.absolutePath
            exampleFiles.forEach { (fileName, inputStream) ->
                val filePath = Paths.get("$destinationPath/$fileName.class");
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            }
        }

        return dir.absolutePathString()
    }
}