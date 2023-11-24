# ETAPE 1: Construire l'application
FROM node:21 AS node-builder

ARG APP_NAME=twendeno-map
ARG ENVIRONMENT=dev
ARG NG_VERSION=17

ENV APP_NAME=$APP_NAME
ENV ENVIRONMENT=$ENVIRONMENT
ENV NG_VERSION=$NG_VERSION

RUN npm cache clean --force
RUN npm install -g @angular/cli@$NG_VERSION

WORKDIR /app

COPY . .

RUN npm install
RUN ng build


# ETAPE 2: Héberger l'application sur un serveur web nginx
FROM nginx:stable as server
EXPOSE 80
EXPOSE 443
RUN rm -rf /usr/share/nginx/html/*
COPY --from=node-builder /app/dist/twendeno-map/browser /usr/share/nginx/html





