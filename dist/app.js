"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const indexRoutes_1 = require("./routes/indexRoutes");
const mongoContactRoutes_1 = require("./routes/mongoContactRoutes");
const pgContactRoutes_1 = require("./routes/pgContactRoutes");
const keys_1 = require("./config/keys");
const mongoose = require("mongoose");
class TSNodeApp {
    constructor() {
        this.mongoURL = keys_1.default.mongoDBURL;
        this.apiApp = express();
        this.bodyParserConfig();
        this.routeConfig();
        this.mongoDBSetup();
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
    mongoDBSetup() {
        mongoose.connect(this.mongoURL, { useNewUrlParser: true });
    }
}
exports.default = new TSNodeApp().apiApp;
//# sourceMappingURL=app.js.map