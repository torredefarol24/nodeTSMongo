"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const contact_1 = require("./routes/api/contact");
const keys_1 = require("./config/keys");
const mongoose = require("mongoose");
class TSNodeApiApp {
    constructor() {
        // public mongoURL : string = AppKeys.mongoDBURL
        this.mongoURL = keys_1.default.mongoDBDockerURL;
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
        this.apiApp.use("/api/contacts", contact_1.default);
    }
    mongoDBSetup() {
        mongoose.connect(this.mongoURL, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.error("DB Error", err);
            }
            else {
                console.log("Connected to MongoDB - API");
            }
        });
    }
}
exports.default = new TSNodeApiApp().apiApp;
//# sourceMappingURL=apiApp.js.map