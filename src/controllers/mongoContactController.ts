import {Request, Response} from 'express';
import {Contact} from '../models/mongo/Contact';

async function getAllContacts(req : Request, res : Response){
  let contacts = await Contact.find({}).then();
  let returnData = {
    msg : "Get All Contacts", 
    method : `${req.method}`,
    success : true,
    data : contacts
  }
  return res.status(200).json(returnData)
}

async function createNewContact(req: Request, res : Response)
{
  let reqFirstName : String = req.body.first_name;
  let reqLastName : String = req.body.last_name;
  let reqPhone : Number = req.body.phone;
  let reqCreatedAt : Date = req.body.created_at;

  let instanceContact = new Contact();
  instanceContact.firstName = reqFirstName.trim();
  instanceContact.lastName = reqLastName.trim();
  instanceContact.phone = reqPhone;
  instanceContact.created_at = reqCreatedAt;

  await instanceContact.save()
  
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