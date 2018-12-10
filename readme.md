## TypeScript with Node & MongoDB

- Backend - Express (written in **TypeScript**)
- Frontend - **Pug** Templating Engine
- Database - MongoDB + Mongoose (ORM)
- FrontendDesign - Zurb Foundation
- CSV Libs - *JSON2CSV, CSV2JSON*
- File Upload - *Multer* --**Awesome Library!**


## Run Docker Container

```sh
$ cd nodeTSMongo
$ docker pull burningraven06/node-ts-mongo
$ docker-compose up
```


## Run App Locally 

- Create DB Config
```sh
$ cd nodeTSMongo
$ touch src/config/keys.ts
```

- Update **src/config/keys.ts**
```sh
const AppKeys = {
  mongoDBURL : <YOUR_MONGODB_URL>,
  mongoDBDockerURL : ""
}

export default AppKeys
```

- Update **src/hostApp.ts**
```sh
$ cd nodeTsMongo/src/   #Open hostApp.ts

# Change Line 19
public mongoURL : string = AppKeys.mongoDBDockerURL

# to 
public mongoURL : string = AppKeys.mongoDBURL
```

- Install Package Dependencies
```sh
$ cd nodeTSMongo
$ yarn install

#Or, with npm
$ npm install
```

- Run App in DEV Mode
```sh
$ cd nodeTSMongo
$ yarn watch-ts
$ yarn watch-js
```

- Run App in PROD Mode
```sh
$ cd nodeTSMongo
$ yarn run production
```
