#!/bin/bash
export INCLUDE_PG_SQL=1
export INCLUDE_RITA=1


export STACK_NAME=rita_dev
export PGSQL_DB_USER='rita'
export PGSQL_DB_PASSWORD='rita_1234'
export PGSQL_DB_HOST='db'
export PGSQL_DB_PORT='5432'

#VARS NEEDED IF PGSQL OR RITA IS INCLUDED
export RITA_DB_NAME="rita"

export MINIO_SECRET_KEY=AKIAU3MOVHLFEQY4HA6O
export MINIO_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
export MINIO_PORT=9000
export MINIO_CONSOLE_PORT=9001
export MINIO_SECURE=false
export MINIO_HOST='172.17.0.1'

export KEYCLOAK_HTTP_PORT=8081
export KEYCLOAK_HTTPS_PORT=8444
export KEYCLOAK_DB_VENDOR='postgres'
export KEYCLOAK_DB_NAME='keycloak'
export KEYCLOAK_USER='admin'
export KEYCLOAK_PASSWORD='admin'

#VARS NEEDED ONLY IF RITA IS INCLUDED
export AUTH_SERVER_URL_WEBSPA="http://localhost:${KEYCLOAK_HTTP_PORT}"
export AUTH_SERVER_URL="http://172.17.0.1:${KEYCLOAK_HTTP_PORT}"
export AUTH_SERVER_SECRET='041b58d4-2a73-4c4b-a8c8-c78304b43191'
export RITA_API_PORT='8080'
export API_URL="http://localhost:${RITA_API_PORT}"
export RITA_WEBSPA_PORT='80'
export RITA_WEBSOCKETS_BROKER_URL="ws://localhost:${RITA_API_PORT}"
export RITA_ROBOCODE_EXAMPLES_PATH="/app/default-robots"
export SSL_ENABLED=true
export SSL_KEY_STORE_PASSWORD="password"
export SSL_KEY_STORE="/etc/ssl/certs/rita.jks"
export SSL_KEY_STORE_TYPE="jks"
export SSL_KEY_ALIAS="ritaweb"
export SSL_KEY_PASSWORD="password"

test -e ./_vars.custom.sh && . ./_vars.custom.sh
