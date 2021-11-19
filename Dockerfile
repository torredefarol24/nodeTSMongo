FROM node:16

WORKDIR /opt/app

COPY package.json ./

RUN yarn install

COPY tsconfig.json ./
COPY ./src ./

EXPOSE 3000

CMD ["yarn", "production"]
