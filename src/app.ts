import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Request, Response} from 'express';
import indexRouter from './routes/indexRoute';

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
    this.apiApp.use(indexRouter);
  }

}

export default new TSNodeApp().apiApp;