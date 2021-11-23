import apiApp from './apiApp';
import hostApp from './hostApp';

import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

dotenvConfig({ path: resolve(__dirname, "../.env") });

const hostPort = process.env.hostPort;
const apiPort = process.env.apiPort;

let logServerAPIApp = function(){
  console.log(`API Listening on ${apiPort}`);
}

let logServerHostApp = function(){
  console.log(`Host Listening on ${hostPort}`);
}

apiApp.listen(apiPort, logServerAPIApp);
hostApp.listen(hostPort, logServerHostApp);
