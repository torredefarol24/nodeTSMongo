import {Router} from 'express';
import PricesController from '../../controllers/host/export'

let PriceRouter: Router = Router();

PriceRouter.get("/", PricesController.showAllPrices);
PriceRouter.get("/csv", PricesController.sendAllCSV);
PriceRouter.get("/:id", PricesController.getSinglePrice);
export default PriceRouter;
