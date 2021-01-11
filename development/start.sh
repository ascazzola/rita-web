#!/bin/bash
. _vars.sh

docker stack deploy -c docker-compose.yml --with-registry-auth ${STACK_NAME}
