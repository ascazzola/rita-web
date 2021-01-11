#!/bin/bash
. _vars.sh

function finish {
  docker stack rm ${STACK_NAME}
}
trap finish EXIT

docker stack deploy -c docker-compose.yml --with-registry-auth ${STACK_NAME}

echo
echo Development environment started. Hit Ctrl+C to exit
sleep infinity
