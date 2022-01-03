FROM nginx:1.17-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/rita/ /usr/share/nginx/html
EXPOSE 80 443
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/environment.template.json > /usr/share/nginx/html/assets/environment.json && exec nginx -g 'daemon off;'"]
