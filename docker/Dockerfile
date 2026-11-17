
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

