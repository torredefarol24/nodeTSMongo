"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
let IndexRouter = express_1.Router();
IndexRouter.get("/", indexController_1.default.indexMethod);
IndexRouter.get("/index", indexController_1.default.renderIndexPage);
IndexRouter.post("/index", indexController_1.default.handlePost);
exports.default = IndexRouter;
//# sourceMappingURL=indexRoute.js.map