FROM node:12

WORKDIR /app/api

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]