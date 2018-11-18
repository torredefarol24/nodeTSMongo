"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../../controllers/host/index");
let IndexRouter = express_1.Router();
IndexRouter.get("/", index_1.default.renderIndexPage);
IndexRouter.get("/about", index_1.default.renderAboutPage);
exports.default = IndexRouter;
//# sourceMappingURL=index.js.map