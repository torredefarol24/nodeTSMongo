import {Router} from 'express';
import ContactsController from'../../controllers/host/contact'

let ContactsRouter: Router = Router();

ContactsRouter.get("/", ContactsController.showAllContacts);
ContactsRouter.get("/add", ContactsController.showAddContactPage);
ContactsRouter.get("/:id", ContactsController.getSingleContact);
ContactsRouter.post("/", ContactsController.createContact);
ContactsRouter.get("/del/:id", ContactsController.deleteContact);
ContactsRouter.post("/edit/:id", ContactsController.editContact);

export default ContactsRouter;