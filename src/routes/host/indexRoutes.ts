import {Router} from 'express';
import IndexController from'../../controllers/host/indexController'

let IndexRouter: Router = Router();

IndexRouter.get("/", IndexController.indexMethod);
IndexRouter.get("/index", IndexController.renderIndexPage);

export default IndexRouter;