FROM node:12

WORKDIR /home/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .