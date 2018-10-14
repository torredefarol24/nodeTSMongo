import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Request, Response} from 'express';
import IndexRouter from './routes/indexRoutes';
import MongoContactRouter from './routes/mongoContactRoutes';
import PGContactRouter from './routes/pgContactRoutes';

class TSNodeApp{
  constructor(){
    this.apiApp = express();
    this.bodyParserConfig();
    this.routeConfig();
  }
  
  public apiApp : express.Application;

  private bodyParserConfig(): void {
    this.apiApp.use(bodyParser.json());
    this.apiApp.use(bodyParser.urlencoded({extended : false}));
  }

  private routeConfig(): void {
    this.apiApp.use(IndexRouter);
    this.apiApp.use("/mongo/contacts", MongoContactRouter);
    this.apiApp.use("/pg/contacts", PGContactRouter)
  }

}

export default new TSNodeApp().apiApp;