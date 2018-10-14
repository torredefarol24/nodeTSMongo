import {Router} from 'express';
import IndexController from '../controllers/indexController'

let IndexRouter: Router = Router();

IndexRouter.get("/", IndexController.indexMethod);
IndexRouter.get("/index", IndexController.renderIndexPage);
IndexRouter.post("/index" , IndexController.handlePost);

export default IndexRouter;