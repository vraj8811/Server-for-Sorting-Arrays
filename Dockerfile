# Use the official Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local code into the container at the working directory
COPY . .

# Expose port 8000 for the application to listen on
EXPOSE 8000

# Command to run the application
CMD ["node", "server.js"]
