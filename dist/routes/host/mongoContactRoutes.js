"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoContact_1 = require("../../controllers/host/mongoContact");
let ContactsRouter = express_1.Router();
ContactsRouter.get("/", mongoContact_1.default.showAllContacts);
// ContactsRouter.get("/", MongoContactsController.renderAboutPage);
exports.default = ContactsRouter;
//# sourceMappingURL=mongoContactRoutes.js.map