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
const JSON2CSV = require("json2csv");
const CSV2JSON = require("csvtojson");
const FS = require("fs");
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
function sendSingleContactCSV(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactId = req.params.id ? req.params.id : "";
        let contextData = {
            data: null,
        };
        if (!contactId) {
            contextData.success = false;
            contextData.msg = "ID missing";
            return res.status(400).json(contextData);
        }
        try {
            let contactFromDB = yield Contact_1.Contact.findById(contactId);
            contextData.data = contactFromDB;
            contextData.msg = "Contact Found";
            let contactFieldLabels = [
                { label: "First Name", value: "firstName" },
                { label: "Last Name", value: "lastName" },
                { label: "Cell", value: "phone" },
                { label: "Address", value: "address" },
                { label: "Contact Type", value: "contactType" }
            ];
            let csvOptions = {
                fields: contactFieldLabels
            };
            let csvData = JSON2CSV.parse(contactFromDB, csvOptions);
            let fileName = `Details_${contactId}.csv`;
            res.attachment(fileName);
            return res.send(csvData);
        }
        catch (error) {
            contextData.msg = error;
            return res.render("contacts/contact-details.pug", contextData);
        }
    });
}
function sendAllContactsCSV(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contactFindOptions = {};
        let contextData = {
            msg: "No Contacts Found",
            contacts: null
        };
        try {
            let contacts = yield Contact_1.Contact.find(contactFindOptions);
            let contactFieldLabels = [
                { label: "First Name", value: "firstName" },
                { label: "Last Name", value: "lastName" },
                { label: "Cell", value: "phone" },
                { label: "Address", value: "address" },
                { label: "Contact Type", value: "contactType" }
            ];
            let csvOptions = {
                fields: contactFieldLabels
            };
            let csvData = JSON2CSV.parse(contacts, csvOptions);
            let currentTime = new Date();
            let fileName = `Contacts_${currentTime}.csv`;
            res.attachment(fileName);
            return res.send(csvData);
        }
        catch (error) {
            contextData.msg = error;
        }
        return res.render("contacts/contacts.pug", contextData);
    });
}
function previewContactFromCSV(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileInstance = req.file;
        let filePath = fileInstance.path;
        let jsonContactData = yield CSV2JSON().fromFile(filePath);
        yield FS.unlinkSync(filePath);
        let contextData = {
            msg: "CSV Parsing Failed"
        };
        if (jsonContactData.length > 1) {
            contextData.contacts = jsonContactData;
            contextData.msg = "Import All Contacts from CSV";
            return res.render('contacts/csv-contacts-preview.pug', contextData);
        }
        else {
            contextData.csvContact = jsonContactData[0];
            contextData.msg = "Import Contact Details";
            return res.render('contacts/csv-single-preview.pug', contextData);
        }
    });
}
function createMultipleCSV(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let allContacts = JSON.parse(req.body.csvContacts);
        let parsedContacts = allContacts.reduce(function (accumulator, currentVal) {
            currentVal.firstName = currentVal['First Name'];
            currentVal.lastName = currentVal['Last Name'];
            currentVal.address = currentVal['Address'];
            currentVal.contactType = currentVal['Contact Type'];
            currentVal.phone = currentVal['Cell'];
            delete currentVal["First Name"];
            delete currentVal['Last Name'];
            delete currentVal["Address"];
            delete currentVal["Cell"];
            delete currentVal["Contact Type"];
            accumulator.push(currentVal);
            return accumulator;
        }, []);
        try {
            let result = yield Contact_1.Contact.insertMany(parsedContacts);
            return res.redirect("/contacts");
        }
        catch (error) {
            console.error("Something went down ", error);
        }
    });
}
const ControllerMethods = {
    showAllContacts: getAllContacts,
    createContact: createNewContact,
    getSingleContact: getContactById,
    editContact: updateContactById,
    deleteContact: deleteContactById,
    showAddContactPage: renderAddContactForm,
    sendSingleCSV: sendSingleContactCSV,
    sendAllCSV: sendAllContactsCSV,
    uploadCSV: previewContactFromCSV,
    saveMultipleCSVContacts: createMultipleCSV
};
exports.default = ControllerMethods;
//# sourceMappingURL=contact.js.map