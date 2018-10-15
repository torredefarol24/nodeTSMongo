"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../../controllers/host/indexController");
let IndexRouter = express_1.Router();
IndexRouter.get("/", indexController_1.default.indexMethod);
IndexRouter.get("/index", indexController_1.default.renderIndexPage);
exports.default = IndexRouter;
//# sourceMappingURL=indexRoutes.js.map