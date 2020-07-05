package edu.robocode.service

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration


@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix="app")
class AppConfiguration {
    var robocode: RobocodeConfiguration = RobocodeConfiguration()
}

@Configuration
@ConfigurationProperties(prefix="app.robocode")
class RobocodeConfiguration {
    var homePath: String = "";
}