"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiApp_1 = require("./apiApp");
const hostApp_1 = require("./hostApp");
const hostPort = 3000;
const apiPort = 4000;
let logServerAPIApp = function () {
    console.log(`API Listening on ${apiPort}`);
};
let logServerHostApp = function () {
    console.log(`Host Listening on ${hostPort}`);
};
apiApp_1.default.listen(apiPort, logServerAPIApp);
hostApp_1.default.listen(hostPort, logServerHostApp);
//# sourceMappingURL=server.js.map