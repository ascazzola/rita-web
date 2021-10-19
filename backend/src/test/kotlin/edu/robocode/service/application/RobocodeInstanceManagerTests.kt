package edu.robocode.service.application

import edu.robocode.service.config.RobocodeConfiguration
import org.junit.jupiter.api.Test
import org.mockito.Mockito.mock
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.messaging.simp.SimpMessagingTemplate
import robocode.control.BattlefieldSpecification
import robocode.control.RobocodeEngine
import java.io.File

@SpringBootTest
class RobocodeInstanceManagerTests {

    @Test
    fun instance_manager_should_be_able_to_run_a_battle() {
        val messageTemplate = mock(SimpMessagingTemplate::class.java)
        val config = RobocodeConfiguration()
        val instanceManager = RobocodeInstanceManager(messageTemplate, config)
        val robots = listOf("sample.Corners", "sample.Walls");
        val specification = BattlefieldSpecification(400, 600)
        val id = instanceManager.newBattle("test", 2,2,1.0,  robots, specification)
        assert(id != null)
    }

    @Test()
    fun robocode_engine_should_not_throw_exceptions() {
        val engine = RobocodeEngine()
    }

}