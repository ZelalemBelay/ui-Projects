# Stage 1: Build Angular App
FROM node:20 AS build
WORKDIR /app
COPY ../../ ./
RUN npm ci --legacy-peer-deps
RUN npm run build --configuration=production

# Stage 2: Serve with NGINX and Certbot
FROM nginx:alpine
COPY --from=build /app/dist/sample-app/browser /usr/share/nginx/html
# COPY ../nginx/angular.conf.template /etc/nginx/conf.d/default.conf

RUN apk add --no-cache certbot certbot-nginx

# Volumes for certbot
VOLUME ["/etc/letsencrypt", "/var/lib/letsencrypt"]
