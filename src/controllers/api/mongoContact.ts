import {Request, Response} from 'express';
import {Contact} from '../../models/mongo/Contact';

async function getAllContacts(req : Request, res : Response){
  let contactFindOptions : any = {};
  let jsonResp : any= {
    msg : "Contacts Found", 
    method : `${req.method}`,
    data : null
  };
  let httpStatus = 200;

  try {
    let contacts = await Contact.find(contactFindOptions);
    jsonResp.data = contacts;
    jsonResp.success = true;
  } catch(error){
    jsonResp.msg = error;
    jsonResp.success = false;
    httpStatus = 500
  }
  return res.status(httpStatus).json(jsonResp)
}

async function createNewContact(req: Request, res : Response){
  let reqFirstName : String = req.body.firstName.trim();
  let reqLastName : String = req.body.lastName.trim();
  let reqPhone : Number = req.body.phone;
  let reqAddress : String = req.body.address.trim();
  let reqContactType : String = req.body.contactType.trim();
  let reqCreatedAt : Date = req.body.created_at.trim();

  if (!reqFirstName || !reqLastName || !reqPhone || !reqAddress){
    return res.status(404).json({ msg : "Values From request Body missing"});
  }

  let instanceContact = new Contact();
  instanceContact.firstName = reqFirstName;
  instanceContact.lastName = reqLastName;
  instanceContact.phone = reqPhone;
  instanceContact.contactType = reqContactType;
  instanceContact.address = reqAddress;
  instanceContact.created_at = reqCreatedAt;
  
  let jsonResp : any = {
    msg : "Create new contact", 
    method : `${req.method}`,
  }

  let httpStatus : number= 200;

  try {
    let contact = await instanceContact.save()
    jsonResp.data = contact;
    jsonResp.success = true;
  } catch(error){
    jsonResp.success = false;
    jsonResp.msg = error;
    httpStatus = 500;
  }
  return res.status(httpStatus).json(jsonResp)
    
}

async function getContactById(req: Request, res: Response){
  let contactId : String = req.params.id;
  let jsonResp : any = {
    msg : "Contact Found" ,
    method : `${req.method}`,
  }
  let httpStatus : number = 200;

  try {
    let contactFromDB = await Contact.findById(contactId)
    jsonResp.data = contactFromDB
    jsonResp.success = true;
  } catch (error){
    jsonResp.msg = error;
    jsonResp.success = false;
    httpStatus = 500;
  }
  return res.status(httpStatus).json(jsonResp);
}

async function updateContactById(req : Request, res :Response){
  let contactId : String = req.params.id;
  let contactFindOptions : any= {
    _id : contactId
  };

  let jsonResp : any = {
    msg : "Edit Contact",
    method : `${req.method}`
  };

  let httpStatus : number= 200;

  try{
    let contactToEdit = await Contact.findOneAndUpdate(contactFindOptions, req.body);
    let editedContact = await Contact.findById(contactFindOptions);
    jsonResp.data = editedContact;
    jsonResp.success = true;
  } catch(error){
    httpStatus = 500;
    jsonResp.success = false;
    jsonResp.msg = error;
  }
  
  return res.status(httpStatus).json(jsonResp);
}

async function deleteContactById(req : Request, res : Response){
  let contactId : String = req.params.id;
  let contactFindOptions : any = {
    _id : contactId
  };

  let jsonResp : any = {
    msg : "Delete Contact",
    method : `${req.method}`
  };
  let httpStatus = 200;

  try {
    await Contact.remove(contactFindOptions)
    jsonResp.success = true;
  } catch(error){
    jsonResp.success = false;
    jsonResp.msg = error;
    httpStatus = 500;
  }
  
  return res.status(httpStatus).json(jsonResp);
}


const ControllerMethods : any = {
  showAllContacts : getAllContacts,
  createContact : createNewContact,
  getSingleContact : getContactById,
  editContact : updateContactById,
  deleteContact : deleteContactById
}

export default ControllerMethods;