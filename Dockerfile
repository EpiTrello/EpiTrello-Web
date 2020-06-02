FROM node:12

WORKDIR /home/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install
COPY . .

# COPY init.sql /docker-entrypoint-initdb.d

EXPOSE 5000

# RUN npm run build
# CMD ["npm", "run", "start"]

CMD ["npm", "run", "dev"]