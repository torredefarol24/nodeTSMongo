import {Router} from 'express';
import {Request, Response} from 'express';
import IndexController from '../controllers/indexController'

const indexRouter = Router();

indexRouter.get("/", IndexController.indexMethod);
indexRouter.get("/index", IndexController.renderIndexPage);
indexRouter.post("/index" , IndexController.handlePost);

export default indexRouter;