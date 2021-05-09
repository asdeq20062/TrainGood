FROM node:16

WORKDIR /app/frontend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 80

RUN npm run build

CMD [ "npm", "start" ]
