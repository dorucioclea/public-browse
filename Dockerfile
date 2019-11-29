FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# RUN npm install
RUN npm install

RUN npm build

# Copy app files to source
COPY . .

# Expose port 
EXPOSE 3000
CMD [ "node", "server.js", "npm run start" ]