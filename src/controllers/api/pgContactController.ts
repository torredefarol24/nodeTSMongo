import {Request, Response} from 'express';

function getAllContacts(req : Request, res : Response){
  let returnData = {
    msg : "Get All Contacts", 
    method : `${req.method}`,
    success : true
  }
  return res.status(200).json(returnData)
}

function createNewContact(req: Request, res : Response)
{
  let reqName : String = req.body.name;
  let reqAge : Number = req.body.age;

  class ContactInterface{
    id : Number;
    name : String;
    age : Number;
  }

  class Contact{
    constructor(name, age){
      this.name = name;
      this.age = age;
      this.id = 0;
    }
    public id : Number;
    public name : String;
    public age : Number;
  }

  let instanceContact:ContactInterface = new Contact(reqName, reqAge)

  let returnData = {
    msg : "Create new contact", 
    method : `${req.method}`,
    success : true,
    data : instanceContact
  }
  return res.status(200).json(returnData);
}

function getContactById(req: Request, res: Response){
  let contactId : Number = parseInt(req.params.id);
  let returnData = {
    msg : "get single contact",
    id : contactId,
    method : `${req.method}`,
    success : true
  }
  return res.status(200).json(returnData);
}

function updateContactById(req : Request, res :Response){
  let contactId : Number = parseInt(req.params.id);
  let returnData = {
    msg : "edit single contact",
    id : contactId,
    method : `${req.method}`,
    success : true,
    data : {
      name : req.body.name,
      age : req.body.age
    }
  }
  return res.status(200).json(returnData);
}

function deleteContactById(req : Request, res : Response){
  let contactId : Number = parseInt(req.params.id);
  let returnData = {
    msg : "Delete single contact",
    id : contactId,
    method : `${req.method}`,
    success : true
  }
  return res.status(200).json(returnData);
}


const ControllerMethods = {
  showAllContacts : getAllContacts,
  createContact : createNewContact,
  getSingleContact : getContactById,
  editContact : updateContactById,
  deleteContact : deleteContactById
}

export default ControllerMethods;