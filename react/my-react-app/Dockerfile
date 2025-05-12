# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files separately to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with a lightweight server
FROM node:18-alpine
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built app from the previous stage
COPY --from=build /app/build .

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["serve", "-s", ".", "-l", "3000", "--single"]