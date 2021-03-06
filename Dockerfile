# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY /package*.json ./
RUN npm install
COPY /. .
ARG mode
RUN npm run build $mode

# production stage
FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
EXPOSE $PORT
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
