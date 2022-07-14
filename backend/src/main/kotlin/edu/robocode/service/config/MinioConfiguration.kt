package edu.robocode.service.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix="app.minio")
class MinioConfiguration {
    var accessKey: String = ""
    var secretKey: String = ""
    var host: String = ""
    var port: Int = 0
    var bucketName: String = ""
    var secure: Boolean = false
}