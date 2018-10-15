"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const host_1 = require("./routes/host");
const mongoContact_1 = require("./routes/host/mongoContact");
const keys_1 = require("./config/keys");
const mongoose = require("mongoose");
class TSNodeHostApp {
    constructor() {
        this.mongoURL = keys_1.default.mongoDBURL;
        this.hostApp = express();
        this.bodyParserConfig();
        this.routeConfig();
        this.mongoDBSetup();
        this.staticFilesSetup();
    }
    bodyParserConfig() {
        this.hostApp.use(bodyParser.json());
        this.hostApp.use(bodyParser.urlencoded({ extended: false }));
    }
    routeConfig() {
        this.hostApp.use(host_1.default);
        this.hostApp.use("/contacts", mongoContact_1.default);
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
    staticFilesSetup() {
        this.hostApp.use(express.static('public'));
    }
}
exports.default = new TSNodeHostApp().hostApp;
//# sourceMappingURL=hostApp.js.map