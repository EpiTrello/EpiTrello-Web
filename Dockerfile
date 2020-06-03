FROM node:12

# ARG NUXT_HOST
# ARG NUXT_PORT

WORKDIR /home/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .