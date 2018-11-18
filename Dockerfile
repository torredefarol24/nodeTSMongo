FROM node:10.13.0

WORKDIR /usr/source/app

COPY package.json ./

RUN yarn install

COPY . . 

EXPOSE 3000

CMD [ "yarn" , "start" ]
