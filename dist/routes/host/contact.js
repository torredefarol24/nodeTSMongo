"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_1 = require("../../controllers/host/contact");
const multer_1 = require("../../middleware/multer");
let ContactsRouter = express_1.Router();
ContactsRouter.get("/", contact_1.default.showAllContacts);
ContactsRouter.get("/add", contact_1.default.showAddContactPage);
ContactsRouter.get("/csv", contact_1.default.sendAllCSV);
ContactsRouter.get("/:id", contact_1.default.getSingleContact);
ContactsRouter.post("/", contact_1.default.createContact);
ContactsRouter.get("/del/:id", contact_1.default.deleteContact);
ContactsRouter.post("/edit/:id", contact_1.default.editContact);
ContactsRouter.get("/csv/:id", contact_1.default.sendSingleCSV);
ContactsRouter.post("/upload/csv", multer_1.default.single('csvInput'), contact_1.default.uploadCSV);
ContactsRouter.post("/multiple/csv", contact_1.default.saveMultipleCSVContacts);
exports.default = ContactsRouter;
//# sourceMappingURL=contact.js.map