import {Router} from 'express';
import MongoContactsController from'../../controllers/host/contact'

let ContactsRouter: Router = Router();

ContactsRouter.get("/", MongoContactsController.showAllContacts);
// ContactsRouter.get("/", MongoContactsController.renderAboutPage);

export default ContactsRouter;