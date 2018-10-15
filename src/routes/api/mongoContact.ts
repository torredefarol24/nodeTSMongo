import {Router, Request, Response} from 'express';
import MongoContactController from '../../controllers/api/mongoContact'

let mongoContactRouter: Router = Router();

mongoContactRouter.get("/", MongoContactController.showAllContacts)
mongoContactRouter.post("/", MongoContactController.createContact)
mongoContactRouter.get("/:id", MongoContactController.getSingleContact)
mongoContactRouter.patch("/:id", MongoContactController.editContact)
mongoContactRouter.delete("/:id", MongoContactController.deleteContact)

export default mongoContactRouter