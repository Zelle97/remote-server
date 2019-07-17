FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src ./src

EXPOSE 8888
CMD [ "npm", "start" ]
