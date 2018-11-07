"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_1 = require("../../controllers/host/contact");
let ContactsRouter = express_1.Router();
ContactsRouter.get("/", contact_1.default.showAllContacts);
// ContactsRouter.get("/", MongoContactsController.renderAboutPage);
exports.default = ContactsRouter;
//# sourceMappingURL=contact.js.map