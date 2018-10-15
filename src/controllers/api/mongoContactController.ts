import {Request, Response} from 'express';
import {Contact} from '../../models/mongo/Contact';

async function getAllContacts(req : Request, res : Response){
  let contactFindOptions : any = {};
  let contacts = await Contact.find(contactFindOptions).then();

  let returnData = {
    msg : contacts ? "Contacts Found" : "No Contacts Found", 
    method : `${req.method}`,
    success : true,
    data : contacts ? contacts : null
  }
  return res.status(200).json(returnData)
}

async function createNewContact(req: Request, res : Response){
  let reqFirstName : String = req.body.firstName.trim();
  let reqLastName : String = req.body.lastName.trim();
  let reqPhone : Number = req.body.phone;
  let reqCreatedAt : Date = req.body.created_at.trim();

  if (!reqFirstName || !reqLastName || !reqPhone || !reqCreatedAt){
    return res.status(404).json({ msg : "Values From request Body missing"});
  }

  let instanceContact = new Contact();
  instanceContact.firstName = reqFirstName;
  instanceContact.lastName = reqLastName;
  instanceContact.phone = reqPhone;
  instanceContact.created_at = reqCreatedAt;
  
  let returnData : any = {
    msg : "Create new contact", 
    method : `${req.method}`,
  }

  let httpStatus : number= 200;

  try {
    let contact = await instanceContact.save()
    returnData.data = contact;
    returnData.success = true;
  } catch(error){
    returnData.success = false;
    returnData.msg = error;
    httpStatus = 500;
  }
  return res.status(httpStatus).json(returnData)
    
}

async function getContactById(req: Request, res: Response){
  let contactId : String = req.params.id;
  let returnData : any = {
    msg : "Contact Found" ,
    method : `${req.method}`,
  }
  let httpStatus : number = 200;

  try {
    let contactFromDB = await Contact.findById(contactId)
    returnData.data = contactFromDB
    returnData.success = true;
  } catch (error){
    returnData.msg = error;
    returnData.success = false;
    httpStatus = 500;
  }
  return res.status(httpStatus).json(returnData);
}

async function updateContactById(req : Request, res :Response){
  let contactId : String = req.params.id;
  let contactFindOptions : any= {
    _id : contactId
  };

  let returnData : any = {
    msg : "Edit Contact",
    method : `${req.method}`
  };

  let httpStatus : number= 200;

  try{
    let contactToEdit = await Contact.findOneAndUpdate(contactFindOptions, req.body);
    let editedContact = await Contact.findById(contactFindOptions);
    returnData.data = editedContact;
    returnData.success = true;
  } catch(error){
    httpStatus = 500;
    returnData.success = false;
    returnData.msg = error;
  }
  
  return res.status(httpStatus).json(returnData);
}

async function deleteContactById(req : Request, res : Response){
  let contactId : String = req.params.id;
  let contactFindOptions : any = {
    _id : contactId
  };

  let returnData : any = {
    msg : "Delete Contact",
    method : `${req.method}`
  };
  let httpStatus = 200;

  try {
    await Contact.remove(contactFindOptions)
    returnData.success = true;
  } catch(error){
    returnData.success = false;
    returnData.msg = error;
    httpStatus = 500;
  }
  
  return res.status(httpStatus).json(returnData);
}


const ControllerMethods : any = {
  showAllContacts : getAllContacts,
  createContact : createNewContact,
  getSingleContact : getContactById,
  editContact : updateContactById,
  deleteContact : deleteContactById
}

export default ControllerMethods;