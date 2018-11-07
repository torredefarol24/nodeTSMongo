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
        let contextData = {
            msg: "No Contacts Found",
            contacts: null
        };
        try {
            let contacts = yield Contact_1.Contact.find(contactFindOptions);
            contextData.contacts = contacts;
            contextData.msg = "Contacts From DB";
        }
        catch (error) {
            contextData.msg = error;
        }
        return res.render("contacts/contacts.pug", contextData);
    });
}
function createNewContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let reqFirstName = req.body.firstName.trim();
        let reqLastName = req.body.lastName.trim();
        let reqPhone = req.body.phone;
        let reqCreatedAt = new Date();
        let reqAddress = req.body.address.trim();
        let reqContactType = req.body.contactType.trim();
        if (!reqFirstName || !reqLastName || !reqPhone || !reqAddress) {
            return res.status(404).json({ msg: "Values From request Body missing" });
        }
        let instanceContact = new Contact_1.Contact();
        instanceContact.firstName = reqFirstName;
        instanceContact.lastName = reqLastName;
        instanceContact.phone = reqPhone;
        instanceContact.address = reqAddress;
        instanceContact.contactType = reqContactType;
        instanceContact.created_at = reqCreatedAt;
        try {
            yield instanceContact.save();
            return res.redirect("/contacts");
        }
        catch (error) {
            return res.redirect("/contacts");
        }
    });
}
function getContactById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactId = req.params.id;
        let contextData = {
            msg: "No Contact Found",
            contact: null
        };
        try {
            let contactFromDB = yield Contact_1.Contact.findById(contactId);
            contextData.data = contactFromDB;
            contextData.msg = "Contact Found";
        }
        catch (error) {
            contextData.msg = error;
        }
        return res.render("contacts/contact-details.pug", contextData);
    });
}
function updateContactById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactId = req.params.id;
        let contactFindOptions = {
            _id: contactId
        };
        try {
            yield Contact_1.Contact.findOneAndUpdate(contactFindOptions, req.body);
            return res.redirect("/contacts");
        }
        catch (error) {
            return res.redirect("/contacts");
        }
    });
}
function deleteContactById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactId = req.params.id;
        let contactFindOptions = {
            _id: contactId
        };
        try {
            yield Contact_1.Contact.remove(contactFindOptions);
            return res.redirect("/contacts");
        }
        catch (error) {
            return res.redirect("/contacts");
        }
    });
}
function renderAddContactForm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.render("contacts/add-contact.pug");
    });
}
const ControllerMethods = {
    showAllContacts: getAllContacts,
    createContact: createNewContact,
    getSingleContact: getContactById,
    editContact: updateContactById,
    deleteContact: deleteContactById,
    showAddContactPage: renderAddContactForm
};
exports.default = ControllerMethods;
//# sourceMappingURL=contact.js.map