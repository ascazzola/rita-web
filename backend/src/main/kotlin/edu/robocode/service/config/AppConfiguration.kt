package edu.robocode.service.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration


@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix="app")
class AppConfiguration {
    var robocode: RobocodeConfiguration = RobocodeConfiguration()
    var minio: MinioConfiguration = MinioConfiguration()
}

@Configuration
@ConfigurationProperties(prefix="app.robocode")
class RobocodeConfiguration {
    var examplesPath: String = ""
}

