"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const contactSchema_1 = require("../../schemas/mongo/contactSchema");
const modelName = "Contact";
exports.Contact = mongoose.model(modelName, contactSchema_1.default);
//# sourceMappingURL=Contact.js.map