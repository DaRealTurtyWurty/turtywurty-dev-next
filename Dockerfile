FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Debug: Display the contents of the /app directory to check if files are copied correctly
RUN ls -la /app

# Copy the rest of the files to the container
COPY . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["npm", "start"]