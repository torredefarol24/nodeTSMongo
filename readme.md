## TypeScript with Node & MongoDB

- Backend - Express (written in **TypeScript**)
- Frontend - **Pug** Templating Engine
- Database - MongoDB + Mongoose (ORM)
- FrontendDesign - Zurb Foundation
- CSV Libs - *JSON2CSV, CSV2JSON*
- File Upload - *Multer* --**Awesome Library!**


## Docker
- Build Container & Run App **Dev Mode**
```sh
$ cd nodeTSMongo
$ docker-compose up
```


## Run Locally 

- Create DB Config
```sh
$ cd nodeTSMongo
$ touch src/config/keys.ts
```

- Update keys.ts
```sh
const AppKeys = {
  mongoDBURL : <YOUR_MONGODB_URL>
}

export default AppKeys
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
