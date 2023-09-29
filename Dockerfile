FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Debug: Display the contents of the /app directory to check if files are copied correctly
RUN ls -la /app

# Debug: Run a simple command to test if Node.js is functioning correctly
RUN node --version

# Debug: Check if npm is working
RUN npm --version

# End of Dockerfile