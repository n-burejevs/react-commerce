# STAGE 1: Compile React inside Docker
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build  # Creates /app/dist inside the container

# STAGE 2: Serve the compiled dist folder via Nginx
FROM nginx:alpine

# Copy the built files from Stage 1 into Nginx's web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]