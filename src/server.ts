import apiApp from './apiApp';
import hostApp from './hostApp';
const hostPort = 3000;
const apiPort = 4000;

let logServerAPIApp = function(){
  console.log(`API Listening on ${apiPort}`);
}

let logServerHostApp = function(){
  console.log(`Host Listening on ${hostPort}`);
}

apiApp.listen(apiPort, logServerAPIApp);
hostApp.listen(hostPort, logServerHostApp);
