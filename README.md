# RITA web

RITA - Robot Inventor to Teach Algorithms 

It is an educational project using [Blockly](https://developers.google.com/blockly) as a block IDE, it allows users to create Robots compatibles with [Robocode](https://robocode.sourceforge.io/)



## Technologies

Rita web is developed using mainly:
- Backend:
    - Spring boot
    - Kotlin
    - Robocode library from MVN
- Frontend:
    - Angular
    - Blockly
    - Ngrx


# Project structure

- Backend folder: Rest API using Spring boot + Kotlin
- [Webspa folder](https://github.com/ascazzola/rita-web/blob/master/webspa/README.md): 
    - rita: RITA Webspa
    - robocode-blockly: blockly plugin to generate code compatible with blockly
    - ngx-robocode-blockly: Angular wrapper from robocode-blockly
    - ngx-robocode-blockly-test: Test project to see how ngx-robocode-blockly works
- [Development](https://github.com/ascazzola/rita-web/tree/master/backend):
    docker-compose files to run project dependencies: PGSQL, Keycloak, MINIO


# Docker images

Docker images available
- [Backend](https://hub.docker.com/r/adrianoscazzola/rita-api)
- [Webspa](https://hub.docker.com/r/adrianoscazzola/rita-webspa) 
