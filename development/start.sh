#!/bin/bash
. _vars.sh

if [ "$INCLUDE_PG_SQL" = "1" ]; then

  if [ "$INCLUDE_RITA" = "1" ]; then
    docker stack deploy -c docker-compose.yml -c pgsql/docker-compose.pgsql.yml -c rita/docker-compose.rita.yml  --with-registry-auth ${STACK_NAME}
  else
    docker stack deploy -c docker-compose.yml -c pgsql/docker-compose.pgsql.yml --with-registry-auth ${STACK_NAME}
  fi

else

  if [ "$INCLUDE_RITA" = "1" ]; then
    docker stack deploy -c docker-compose.yml -c rita/docker-compose.rita.yml --with-registry-auth ${STACK_NAME}
  else
    docker stack deploy -c docker-compose.yml  --with-registry-auth ${STACK_NAME}
  fi
fi
