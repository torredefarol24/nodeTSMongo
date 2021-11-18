import {Router} from 'express';
import IndexController from'../../controllers/host/index'

let IndexRouter: Router = Router();

IndexRouter.get("/", IndexController.renderIndexPage);

export default IndexRouter;
