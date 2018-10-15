"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const host_1 = require("../controllers/host");
let IndexRouter = express_1.Router();
IndexRouter.get("/", host_1.default.indexMethod);
IndexRouter.get("/index", host_1.default.renderIndexPage);
IndexRouter.post("/index", host_1.default.handlePost);
exports.default = IndexRouter;
//# sourceMappingURL=indexRoutes.js.map