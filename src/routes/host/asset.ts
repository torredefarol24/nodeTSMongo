import {Router} from 'express';
import AssetController from'../../controllers/host/asset'

let AssetRouter: Router = Router();

AssetRouter.get("/:asset", AssetController.renderAssetChart);

export default AssetRouter;
