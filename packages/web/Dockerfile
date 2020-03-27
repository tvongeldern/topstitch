FROM node:12

WORKDIR /app/web

COPY ./package.json ./package-lock.json ./

RUN npm install

EXPOSE 3000

CMD npm start