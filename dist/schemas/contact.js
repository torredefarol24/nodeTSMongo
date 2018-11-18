"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const contactSchemaOptions = {
    firstName: {
        type: String,
        required: "Provide First Name"
    },
    lastName: {
        type: String,
        required: "Provide Last Name"
    },
    phone: {
        type: String,
        required: "Provide Phone"
    },
    contactType: {
        type: String,
        default: "Other"
    },
    address: {
        type: String,
        required: "Provide Address"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
};
const ContactSchema = new mongoose.Schema(contactSchemaOptions);
exports.default = ContactSchema;
//# sourceMappingURL=contact.js.map