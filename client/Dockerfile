ARG NODE_IMAGE=node:12

FROM ${NODE_IMAGE} as build

WORKDIR /client

# Restore node_modules
COPY ["package.json", "package-lock.json", "./"]
RUN npm install

COPY . .
RUN npm run lint
RUN npm run build:prod

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /client/dist/rita /usr/share/nginx/html
EXPOSE 8080
EXPOSE 8443
RUN chmod -R 777 /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html/assets/
USER nobody
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/environment.template.json > /usr/share/nginx/html/assets/environment.json && exec nginx -g 'daemon off;'"]

