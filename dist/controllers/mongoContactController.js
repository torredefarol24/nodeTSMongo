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
const Contact_1 = require("../models/mongo/Contact");
function getAllContacts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactFindOptions = {};
        let contacts = yield Contact_1.Contact.find(contactFindOptions).then();
        let returnData = {
            msg: contacts ? "Contacts Found" : "No Contacts Found",
            method: `${req.method}`,
            success: true,
            data: contacts ? contacts : null
        };
        return res.status(200).json(returnData);
    });
}
function createNewContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let reqFirstName = req.body.firstName.trim();
        let reqLastName = req.body.lastName.trim();
        let reqPhone = req.body.phone;
        let reqCreatedAt = req.body.created_at.trim();
        if (!reqFirstName || !reqLastName || !reqPhone || !reqCreatedAt) {
            return res.status(404).json({ msg: "Values From request Body missing" });
        }
        let instanceContact = new Contact_1.Contact();
        instanceContact.firstName = reqFirstName;
        instanceContact.lastName = reqLastName;
        instanceContact.phone = reqPhone;
        instanceContact.created_at = reqCreatedAt;
        let returnData = {
            msg: "Create new contact",
            method: `${req.method}`,
        };
        let httpStatus = 200;
        try {
            let contact = yield instanceContact.save();
            returnData.data = contact;
            returnData.success = true;
        }
        catch (error) {
            returnData.success = false;
            returnData.msg = error;
            httpStatus = 500;
        }
        return res.status(httpStatus).json(returnData);
    });
}
function getContactById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactId = req.params.id;
        let returnData = {
            msg: "Contact Found",
            method: `${req.method}`,
        };
        let httpStatus = 200;
        try {
            let contactFromDB = yield Contact_1.Contact.findById(contactId);
            returnData.data = contactFromDB;
            returnData.success = true;
        }
        catch (error) {
            returnData.msg = error;
            returnData.success = false;
            httpStatus = 500;
        }
        return res.status(httpStatus).json(returnData);
    });
}
function updateContactById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactId = req.params.id;
        let contactFindOptions = {
            _id: contactId
        };
        let returnData = {
            msg: "Edit Contact",
            method: `${req.method}`
        };
        let httpStatus = 200;
        try {
            let contactToEdit = yield Contact_1.Contact.findOneAndUpdate(contactFindOptions, req.body);
            let editedContact = yield Contact_1.Contact.findById(contactFindOptions);
            returnData.data = editedContact;
            returnData.success = true;
        }
        catch (error) {
            httpStatus = 500;
            returnData.success = false;
            returnData.msg = error;
        }
        return res.status(httpStatus).json(returnData);
    });
}
function deleteContactById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactId = req.params.id;
        let contactFindOptions = {
            _id: contactId
        };
        let returnData = {
            msg: "Delete Contact",
            method: `${req.method}`
        };
        let httpStatus = 200;
        try {
            yield Contact_1.Contact.remove(contactFindOptions);
            returnData.success = true;
        }
        catch (error) {
            returnData.success = false;
            returnData.msg = error;
            httpStatus = 500;
        }
        return res.status(httpStatus).json(returnData);
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
//# sourceMappingURL=mongoContactController.js.map