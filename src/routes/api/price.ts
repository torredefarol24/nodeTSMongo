import {Router, Request, Response} from 'express';
import MongoPriceController from '../../controllers/api/price'

let mongoPriceRouter: Router = Router();

mongoPriceRouter.get("/", MongoPriceController.showAllPrices)
mongoPriceRouter.get("/:id", MongoPriceController.getSinglePrice)

export default mongoPriceRouter
