# Stage 1: Set up backend server
FROM node:16 AS backend

# Set working directory for backend
WORKDIR /app/server

# Install backend dependencies
COPY server/package.json server/package-lock.json ./
RUN npm install

# Copy the backend files to the container
COPY server ./

# Copy the entire web directory (frontend) into the container
COPY web /app/web

# Expose the port the backend will run on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
