"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoContact_1 = require("./routes/api/mongoContact");
const pgContact_1 = require("./routes/api/pgContact");
const keys_1 = require("./config/keys");
const mongoose = require("mongoose");
class TSNodeApiApp {
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
        this.apiApp.use("/api/mongo/contacts", mongoContact_1.default);
        this.apiApp.use("/api/pg/contacts", pgContact_1.default);
    }
    mongoDBSetup() {
        mongoose.connect(this.mongoURL, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.error("DB Error", err);
            }
            else {
                console.log("Connected to MongoDB");
            }
        });
    }
}
exports.default = new TSNodeApiApp().apiApp;
//# sourceMappingURL=apiApp.js.map