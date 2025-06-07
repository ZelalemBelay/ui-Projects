# Stage 1: Build the Angular app
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build files to nginx public directory
COPY --from=build /app/dist/sample-app/browser /usr/share/nginx/html
# COPY ../nginx/angular.conf.template /etc/nginx/conf.d/default.conf

# Optional: Expose port
EXPOSE 80

