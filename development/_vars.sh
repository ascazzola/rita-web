#!/bin/bash

export STACK_NAME=rita_dev
export DB_PASSWORD='rad_1234'

export MINIO_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
export MINIO_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
export MINIO_PORT=8082

export KEYCLOAK_HTTP_PORT=8081
export KEYCLOAK_HTTPS_PORT=8444
export KEYCLOAK_DB_VENDOR='postgres'
export KEYCLOAK_DB_ADDR='172.17.0.1'
export KEYCLOAK_DB_NAME='keycloak'
export KEYCLOAK_DB_USER='keycloak'
export KEYCLOAK_DB_PASSWORD='P@ssword!'
export KEYCLOAK_USER='admin'
export KEYCLOAK_PASSWORD='admin'

test -e ./_vars.custom.sh && . ./_vars.custom.sh
