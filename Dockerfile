FROM nginx:1.13.12-alpine as production-stage

ENV SERVER_PORT=$SERVER_PORT \
    EXPOSE_PORT=$EXPOSE_PORT \
    CONTAINER_NAME=$CONTAINER_NAME \
    IMAGE_NAME=$IMAGE_NAME

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

EXPOSE ${SERVER_PORT}
