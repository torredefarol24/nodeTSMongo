"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pgContact_1 = require("../../controllers/api/pgContact");
let pgContactRouter = express_1.Router();
pgContactRouter.get("/", pgContact_1.default.showAllContacts);
pgContactRouter.post("/", pgContact_1.default.createContact);
pgContactRouter.get("/:id", pgContact_1.default.getSingleContact);
pgContactRouter.patch("/:id", pgContact_1.default.editContact);
pgContactRouter.delete("/:id", pgContact_1.default.deleteContact);
exports.default = pgContactRouter;
//# sourceMappingURL=pgContact.js.map