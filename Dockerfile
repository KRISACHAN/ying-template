FROM nginx:latest
RUN nginx -v

ENV SERVER_PORT=$SERVER_PORT

ENV EXPOSE_PORT=$EXPOSE_PORT

ENV CONTAINER_NAME=$CONTAINER_NAME

ENV IMAGE_NAME=$IMAGE_NAME

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

EXPOSE ${SERVER_PORT}