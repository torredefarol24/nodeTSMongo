"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const indexRoutes_1 = require("./routes/indexRoutes");
const mongoContactRoutes_1 = require("./routes/mongoContactRoutes");
const pgContactRoutes_1 = require("./routes/pgContactRoutes");
class TSNodeApp {
    constructor() {
        this.apiApp = express();
        this.bodyParserConfig();
        this.routeConfig();
    }
    bodyParserConfig() {
        this.apiApp.use(bodyParser.json());
        this.apiApp.use(bodyParser.urlencoded({ extended: false }));
    }
    routeConfig() {
        this.apiApp.use(indexRoutes_1.default);
        this.apiApp.use("/mongo/contacts", mongoContactRoutes_1.default);
        this.apiApp.use("/pg/contacts", pgContactRoutes_1.default);
    }
}
exports.default = new TSNodeApp().apiApp;
//# sourceMappingURL=app.js.map