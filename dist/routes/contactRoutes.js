"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
let ContactRouter = express_1.Router();
ContactRouter.get("/", contactController_1.default.showAllContacts);
ContactRouter.post("/", contactController_1.default.createContact);
ContactRouter.get("/:id", contactController_1.default.getSingleContact);
ContactRouter.patch("/:id", contactController_1.default.editContact);
ContactRouter.delete("/:id", contactController_1.default.deleteContact);
exports.default = ContactRouter;
//# sourceMappingURL=contactRoutes.js.map