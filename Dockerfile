FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN cd ./frontend && npm install && npm run build

EXPOSE 8080
CMD [ "node", "./dist/src/app.js" ]