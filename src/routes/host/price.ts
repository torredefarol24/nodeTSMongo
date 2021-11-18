import {Router} from 'express';
import PricesController from '../../controllers/host/price'
import fileUpload from '../../middleware/multer';

let PriceRouter: Router = Router();

PriceRouter.get("/", PricesController.showAllPrices);
PriceRouter.get("/csv", PricesController.sendAllCSV);
PriceRouter.get("/:id", PricesController.getSinglePrice);
export default PriceRouter;
