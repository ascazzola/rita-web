package edu.robocode.service

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class RobocodeServiceApplication {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            runApplication<RobocodeServiceApplication>(*args);
        }
    }
}
