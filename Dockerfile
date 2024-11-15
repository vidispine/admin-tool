FROM nginx
ARG PUBLIC_URL
COPY build /usr/share/nginx/html${PUBLIC_URL}
COPY build/index.html /usr/share/nginx/html/
COPY proxy.template /etc/nginx/conf.d/proxy.template
ENV VIDISPINE_URL=http://localhost:8080
CMD ["/bin/bash", "-c", "NGINX_RESOLVER=${NGINX_RESOLVER+resolver ${NGINX_RESOLVER};} && envsubst '$VIDISPINE_URL,$NGINX_RESOLVER' < /etc/nginx/conf.d/proxy.template > /etc/nginx/conf.d/default.conf && envsubst < /usr/share/nginx/html/index.html > /tmp/_index.html && mv -f /tmp/_index.html /usr/share/nginx/html/index.html && nginx -g 'daemon off;'"]
