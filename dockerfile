FROM node:19
WORKDIR /usr/src/app

CMD ["npm", "nodemon", "index.js"]

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app