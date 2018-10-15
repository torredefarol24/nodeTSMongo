"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const host_1 = require("../../controllers/host");
let IndexRouter = express_1.Router();
IndexRouter.get("/", host_1.default.renderIndexPage);
IndexRouter.get("/about", host_1.default.renderAboutPage);
exports.default = IndexRouter;
//# sourceMappingURL=indexRoutes.js.map