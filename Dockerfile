# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY /package*.json ./
RUN npm install
COPY /. .
ARG mode
RUN npm run build $mode

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# COPY prod_nginx.conf /etc/nginx/nginx.conf
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]
