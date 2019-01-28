FROM nginx

LABEL maintainer="christoph.birk@gmail.com" \
      application="data-inspector-ui" \
      version="0.1.0" 

ADD dist/data-inspector-ui-*.zip /usr/share/nginx/html

EXPOSE 4200