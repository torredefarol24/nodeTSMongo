"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contact_1 = require("../../models/Contact");
function getAllContacts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactFindOptions = {};
        let jsonResp = {
            msg: "Contacts Found",
            method: `${req.method}`,
            data: null
        };
        let httpStatus = 200;
        try {
            let contacts = yield Contact_1.Contact.find(contactFindOptions);
            jsonResp.data = contacts;
            jsonResp.success = true;
        }
        catch (error) {
            jsonResp.msg = error;
            jsonResp.success = false;
            httpStatus = 500;
        }
        return res.status(httpStatus).json(jsonResp);
    });
}
function createNewContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let reqFirstName = req.body.firstName.trim();
        let reqLastName = req.body.lastName.trim();
        let reqPhone = req.body.phone;
        let reqAddress = req.body.address.trim();
        let reqContactType = req.body.contactType.trim();
        let reqCreatedAt = req.body.created_at.trim();
        if (!reqFirstName || !reqLastName || !reqPhone || !reqAddress) {
            return res.status(404).json({ msg: "Values From request Body missing" });
        }
        let instanceContact = new Contact_1.Contact();
        instanceContact.firstName = reqFirstName;
        instanceContact.lastName = reqLastName;
        instanceContact.phone = reqPhone;
        instanceContact.contactType = reqContactType;
        instanceContact.address = reqAddress;
        instanceContact.created_at = reqCreatedAt;
        let jsonResp = {
            msg: "Create new contact",
            method: `${req.method}`,
        };
        let httpStatus = 200;
        try {
            let contact = yield instanceContact.save();
            jsonResp.data = contact;
            jsonResp.success = true;
        }
        catch (error) {
            jsonResp.success = false;
            jsonResp.msg = error;
            httpStatus = 500;
        }
        return res.status(httpStatus).json(jsonResp);
    });
}
function getContactById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactId = req.params.id;
        let jsonResp = {
            msg: "Contact Found",
            method: `${req.method}`,
        };
        let httpStatus = 200;
        try {
            let contactFromDB = yield Contact_1.Contact.findById(contactId);
            jsonResp.data = contactFromDB;
            jsonResp.success = true;
        }
        catch (error) {
            jsonResp.msg = error;
            jsonResp.success = false;
            httpStatus = 500;
        }
        return res.status(httpStatus).json(jsonResp);
    });
}
function updateContactById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactId = req.params.id;
        let contactFindOptions = {
            _id: contactId
        };
        let jsonResp = {
            msg: "Edit Contact",
            method: `${req.method}`
        };
        let httpStatus = 200;
        try {
            let contactToEdit = yield Contact_1.Contact.findOneAndUpdate(contactFindOptions, req.body);
            let editedContact = yield Contact_1.Contact.findById(contactFindOptions);
            jsonResp.data = editedContact;
            jsonResp.success = true;
        }
        catch (error) {
            httpStatus = 500;
            jsonResp.success = false;
            jsonResp.msg = error;
        }
        return res.status(httpStatus).json(jsonResp);
    });
}
function deleteContactById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactId = req.params.id;
        let contactFindOptions = {
            _id: contactId
        };
        let jsonResp = {
            msg: "Delete Contact",
            method: `${req.method}`
        };
        let httpStatus = 200;
        try {
            yield Contact_1.Contact.remove(contactFindOptions);
            jsonResp.success = true;
        }
        catch (error) {
            jsonResp.success = false;
            jsonResp.msg = error;
            httpStatus = 500;
        }
        return res.status(httpStatus).json(jsonResp);
    });
}
const ControllerMethods = {
    showAllContacts: getAllContacts,
    createContact: createNewContact,
    getSingleContact: getContactById,
    editContact: updateContactById,
    deleteContact: deleteContactById
};
exports.default = ControllerMethods;
//# sourceMappingURL=contact.js.map