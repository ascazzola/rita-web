# Development environment setup

# External dependencies

- Local Docker Swarm cluster - just run `docker swarm init`

- Postgres server with database already created: keycloak


# Instructions

Ensure that you are logged in into Docker Hub registry: `docker login`

Run ./start.sh to start development environment

Run ./stop.sh to stop development environment


First time user should be created accesing to keycloak by default http://localhost:8081/auth/ user admin and password admin
in realm RITA users should be created with roles admin (for administrator) and user (for non administrator users)

## Troubleshooting

To verify the running status of the stack services you can do:

```
docker stack services rita_dev_keycloak
```

[Portainer](https://www.portainer.io/installation/) can be used to look at the logs to troubleshoot startup issues:

```
docker volume create portainer_data

docker run -d -p 8000:8000 -p 9000:9000 --name=portainer -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce

```

## Overriding default settings

In case you want to override any of the default development environment settings (i.e. db password), export the corresponding environment variables in `_vars.custom.sh` file, which should not be commited to source control (it is already excluded in .gitignore).

A sample `_vars.custom.sh` would be as follows:

```
#!/bin/bash
export DB_PASSWORD='Pas$w0rd'
```