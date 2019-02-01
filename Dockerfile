FROM nginx

LABEL maintainer="christoph.birk@gmail.com" \
      application="data-inspector-ui" \
      version="0.1.0" 

COPY dist/* /usr/share/nginx/html/
COPY nginx.conf.d/default.template /etc/nginx/conf.d/

ENV NGINX_PORT=80 \
    SERVER_NAME=nginx \
    DDS2NG_HOST=localhost \
    DDS2NG_PORT=3000 \
    HTTP_UPGRADE=http_upgrade \
    HOST=host


CMD ["/bin/bash", "-c", "envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
