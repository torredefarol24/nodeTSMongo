import {Request, Response} from 'express';
import {Contact} from '../../models/Contact';

async function getAllContacts(req : Request, res : Response){
  let contactFindOptions : any = {};
  let contextData : any = {
    msg : "No Contacts Found", 
    contacts : null
  }
  try {
    let contacts = await Contact.find(contactFindOptions);
    contextData.contacts = contacts;
    contextData.msg = "Contacts From DB";
  } catch(error){
    contextData.msg = error;
  }
  return res.render("contacts/contacts.pug", contextData)
}

async function createNewContact(req: Request, res : Response){
  let reqFirstName : String = req.body.firstName.trim();
  let reqLastName : String = req.body.lastName.trim();
  let reqPhone : Number = req.body.phone;
  let reqCreatedAt : Date = new Date();
  let reqAddress : String = req.body.address.trim();
  let reqContactType : String = req.body.contactType.trim();

  if (!reqFirstName || !reqLastName || !reqPhone || !reqAddress){
    return res.status(404).json({ msg : "Values From request Body missing"});
  }

  let instanceContact = new Contact();
  instanceContact.firstName = reqFirstName;
  instanceContact.lastName = reqLastName;
  instanceContact.phone = reqPhone;
  instanceContact.address = reqAddress;
  instanceContact.contactType = reqContactType;
  instanceContact.created_at = reqCreatedAt;
  
  try {
    await instanceContact.save()
    return res.redirect("/contacts")
  } catch(error){
    return res.redirect("/contacts")
  } 
}

async function getContactById(req: Request, res: Response){
  let contactId : String = req.params.id;
  let contextData : any = {
    msg : "No Contact Found" ,
    contact : null
  }
  try {
    let contactFromDB = await Contact.findById(contactId)
    contextData.data = contactFromDB
    contextData.msg = "Contact Found"
  } catch (error){
    contextData.msg = error;
  }
  return res.render("contacts/contact-details.pug", contextData);
}

async function updateContactById(req : Request, res :Response){
  let contactId : String = req.params.id;
  let contactFindOptions : any= {
    _id : contactId
  };
  try {
    await Contact.findOneAndUpdate(contactFindOptions, req.body);
    return res.redirect("/contacts")
  } catch(error){
    return res.redirect("/contacts")
  }
  
}

async function deleteContactById(req : Request, res : Response){
  let contactId : String = req.params.id;
  let contactFindOptions : any = {
    _id : contactId
  };
  try {
    await Contact.remove(contactFindOptions)
    return res.redirect("/contacts");
  } catch(error){
    return res.redirect("/contacts");
  }  
}

async function renderAddContactForm(req : Request, res : Response ){
  return res.render("contacts/add-contact.pug");
}


const ControllerMethods : any = {
  showAllContacts : getAllContacts,
  createContact : createNewContact,
  getSingleContact : getContactById,
  editContact : updateContactById,
  deleteContact : deleteContactById,
  showAddContactPage : renderAddContactForm
}

export default ControllerMethods;