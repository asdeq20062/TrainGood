FROM node:16

WORKDIR /app/backend

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "start-prod" ]