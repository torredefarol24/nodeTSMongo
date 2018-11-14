import {Router} from 'express';
import ContactsController from'../../controllers/host/contact'
import fileUpload from '../../middleware/multer';

let ContactsRouter: Router = Router();

ContactsRouter.get("/", ContactsController.showAllContacts);
ContactsRouter.get("/add", ContactsController.showAddContactPage);
ContactsRouter.get("/csv", ContactsController.sendAllCSV);
ContactsRouter.get("/:id", ContactsController.getSingleContact);
ContactsRouter.post("/", ContactsController.createContact);
ContactsRouter.get("/del/:id", ContactsController.deleteContact);
ContactsRouter.post("/edit/:id", ContactsController.editContact);
ContactsRouter.get("/csv/:id", ContactsController.sendSingleCSV);
ContactsRouter.post("/upload/csv", fileUpload.single('csvInput'), ContactsController.uploadCSV);
ContactsRouter.post("/multiple/csv", ContactsController.saveMultipleCSVContacts)
export default ContactsRouter;