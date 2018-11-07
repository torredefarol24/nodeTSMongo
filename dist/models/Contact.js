"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const contact_1 = require("../schemas/contact");
const modelName = "Contact";
exports.Contact = mongoose.model(modelName, contact_1.default);
//# sourceMappingURL=Contact.js.map