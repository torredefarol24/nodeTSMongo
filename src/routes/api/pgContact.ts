import {Router, Request, Response} from 'express';
import PGContactController from '../../controllers/api/pgContact'

let pgContactRouter: Router = Router();

pgContactRouter.get("/", PGContactController.showAllContacts)
pgContactRouter.post("/", PGContactController.createContact)
pgContactRouter.get("/:id", PGContactController.getSingleContact)
pgContactRouter.patch("/:id", PGContactController.editContact)
pgContactRouter.delete("/:id", PGContactController.deleteContact)

export default pgContactRouter