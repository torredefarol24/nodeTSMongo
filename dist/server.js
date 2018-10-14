"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const backendPort = 4000;
let logServer = function () {
    console.log(`Server Listening on ${backendPort}`);
};
app_1.default.listen(backendPort, logServer);
//# sourceMappingURL=server.js.map