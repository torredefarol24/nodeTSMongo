import {Router} from 'express';
import IndexController from'../../controllers/host/index'

let IndexRouter: Router = Router();

IndexRouter.get("/", IndexController.renderIndexPage);
IndexRouter.get("/about", IndexController.renderAboutPage);

export default IndexRouter;