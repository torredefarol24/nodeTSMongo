"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoContact_1 = require("../../controllers/api/mongoContact");
let mongoContactRouter = express_1.Router();
mongoContactRouter.get("/", mongoContact_1.default.showAllContacts);
mongoContactRouter.post("/", mongoContact_1.default.createContact);
mongoContactRouter.get("/:id", mongoContact_1.default.getSingleContact);
mongoContactRouter.patch("/:id", mongoContact_1.default.editContact);
mongoContactRouter.delete("/:id", mongoContact_1.default.deleteContact);
exports.default = mongoContactRouter;
//# sourceMappingURL=mongoContact.js.map