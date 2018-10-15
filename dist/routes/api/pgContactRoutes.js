"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pgContactController_1 = require("../../controllers/api/pgContactController");
let pgContactRouter = express_1.Router();
pgContactRouter.get("/", pgContactController_1.default.showAllContacts);
pgContactRouter.post("/", pgContactController_1.default.createContact);
pgContactRouter.get("/:id", pgContactController_1.default.getSingleContact);
pgContactRouter.patch("/:id", pgContactController_1.default.editContact);
pgContactRouter.delete("/:id", pgContactController_1.default.deleteContact);
exports.default = pgContactRouter;
//# sourceMappingURL=pgContactRoutes.js.map