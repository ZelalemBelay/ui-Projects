# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files first (important for caching and consistency)
COPY package*.json ./

# Clean install
RUN npm ci

# Copy rest of app
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve with a lightweight server
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build .
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]