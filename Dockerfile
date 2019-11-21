FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Bundle app
COPY . .

EXPOSE 5000

CMD [ "npm", "run prod"]