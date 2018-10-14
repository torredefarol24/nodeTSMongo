"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoContactController_1 = require("../controllers/mongoContactController");
let mongoContactRouter = express_1.Router();
mongoContactRouter.get("/", mongoContactController_1.default.showAllContacts);
mongoContactRouter.post("/", mongoContactController_1.default.createContact);
mongoContactRouter.get("/:id", mongoContactController_1.default.getSingleContact);
mongoContactRouter.patch("/:id", mongoContactController_1.default.editContact);
mongoContactRouter.delete("/:id", mongoContactController_1.default.deleteContact);
exports.default = mongoContactRouter;
//# sourceMappingURL=mongoContactRoutes.js.map