"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_1 = require("../../controllers/api/contact");
let mongoContactRouter = express_1.Router();
mongoContactRouter.get("/", contact_1.default.showAllContacts);
mongoContactRouter.post("/", contact_1.default.createContact);
mongoContactRouter.get("/:id", contact_1.default.getSingleContact);
mongoContactRouter.patch("/:id", contact_1.default.editContact);
mongoContactRouter.delete("/:id", contact_1.default.deleteContact);
exports.default = mongoContactRouter;
//# sourceMappingURL=contact.js.map