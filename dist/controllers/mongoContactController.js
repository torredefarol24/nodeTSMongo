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
        let contacts = yield Contact_1.Contact.find({}).then();
        let returnData = {
            msg: "Get All Contacts",
            method: `${req.method}`,
            success: true,
            data: contacts
        };
        return res.status(200).json(returnData);
    });
}
function createNewContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let reqFirstName = req.body.first_name;
        let reqLastName = req.body.last_name;
        let reqPhone = req.body.phone;
        let reqCreatedAt = req.body.created_at;
        let instanceContact = new Contact_1.Contact();
        instanceContact.firstName = reqFirstName.trim();
        instanceContact.lastName = reqLastName.trim();
        instanceContact.phone = reqPhone;
        instanceContact.created_at = reqCreatedAt;
        yield instanceContact.save();
        let returnData = {
            msg: "Create new contact",
            method: `${req.method}`,
            success: true,
            data: instanceContact
        };
        return res.status(200).json(returnData);
    });
}
function getContactById(req, res) {
    let contactId = parseInt(req.params.id);
    let returnData = {
        msg: "get single contact",
        id: contactId,
        method: `${req.method}`,
        success: true
    };
    return res.status(200).json(returnData);
}
function updateContactById(req, res) {
    let contactId = parseInt(req.params.id);
    let returnData = {
        msg: "edit single contact",
        id: contactId,
        method: `${req.method}`,
        success: true,
        data: {
            name: req.body.name,
            age: req.body.age
        }
    };
    return res.status(200).json(returnData);
}
function deleteContactById(req, res) {
    let contactId = parseInt(req.params.id);
    let returnData = {
        msg: "Delete single contact",
        id: contactId,
        method: `${req.method}`,
        success: true
    };
    return res.status(200).json(returnData);
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