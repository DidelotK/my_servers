FROM node:6.11

MAINTAINER Axel Camara <axel.camara@hotmail.fr>

# Create app directory
RUN mkdir -p /usr/src/app

# Bundle app source
COPY /app /usr/src/app

# Install app dependencies
RUN cd /usr/src/app/client && npm install
RUN cd /usr/src/app/server && npm install

# Build client
RUN cd /usr/src/app/client && npm run build

EXPOSE 4000

WORKDIR /usr/src/app/server

CMD ["npm", "start"]
