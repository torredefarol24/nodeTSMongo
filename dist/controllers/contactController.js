"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllContacts(req, res) {
    let returnData = {
        msg: "Get All Contacts",
        method: `${req.method}`,
        success: true
    };
    return res.status(200).json(returnData);
}
function createNewContact(req, res) {
    let reqName = req.body.name;
    let reqAge = req.body.age;
    class ContactInterface {
    }
    class Contact {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            this.id = 0;
        }
    }
    let instanceContact = new Contact(reqName, reqAge);
    let returnData = {
        msg: "Create new contact",
        method: `${req.method}`,
        success: true,
        data: instanceContact
    };
    return res.status(200).json(returnData);
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
//# sourceMappingURL=contactController.js.map