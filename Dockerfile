FROM nginx

LABEL maintainer="christoph.birk@gmail.com" \
      application="data-inspector-ui" \
      version="0.1.0" 

COPY dist/* /usr/share/nginx/html