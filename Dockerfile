FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install npm@7

COPY . .

EXPOSE 8080

CMD npm run start