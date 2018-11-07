"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_1 = require("../../controllers/host/contact");
let ContactsRouter = express_1.Router();
ContactsRouter.get("/", contact_1.default.showAllContacts);
ContactsRouter.get("/add", contact_1.default.showAddContactPage);
ContactsRouter.get("/:id", contact_1.default.getSingleContact);
ContactsRouter.post("/", contact_1.default.createContact);
ContactsRouter.get("/del/:id", contact_1.default.deleteContact);
ContactsRouter.post("/edit/:id", contact_1.default.editContact);
exports.default = ContactsRouter;
//# sourceMappingURL=contact.js.map