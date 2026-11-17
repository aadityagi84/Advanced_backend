
# Use Node.js LTS Alpine image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files first (better Docker caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy application source code
COPY src ./src
COPY server.js ./

# Run as non-root user
USER node

# Backend port (change if your application uses another port)
EXPOSE 8080

# Start application
CMD ["npm", "start"]


# and now run a command to build the Docker image and run the container:To build the Docker image and run the container, you can use the following commands in your terminal:
# 1. Build the Docker image:
# ```bash
# docker build -t my-node-app  path/to/your/Dockerfile


# ========
# to run now docker image 
# docker run -it -p 8080:8080 my-node-app
# docker run --name my-container my-node-app:latest

# ========================
# now to go  isnide the running container and check the logs, you can use the following command:
#  the commands are : docker exec -it <container_id> sh/bash 

# ```