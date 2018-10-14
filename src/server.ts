import apiApp from './app';
const backendPort = 4000;

let logServer = function(){
  console.log(`Server Listening on ${backendPort}`);
}

apiApp.listen(backendPort, logServer);