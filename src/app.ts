import * as express from 'express';
import * as bodyParser from 'body-parser';
import IndexRouter from './routes/indexRoutes';
import MongoContactRouter from './routes/mongoContactRoutes';
import PGContactRouter from './routes/pgContactRoutes';
import AppKeys from './config/keys';
import * as mongoose from 'mongoose';

class TSNodeApp{
  constructor(){
    this.apiApp = express();
    this.bodyParserConfig();
    this.routeConfig();
    this.mongoDBSetup();
  }
  
  public apiApp : express.Application;
  public mongoURL : string = AppKeys.mongoDBURL

  private bodyParserConfig(): void {
    this.apiApp.use(bodyParser.json());
    this.apiApp.use(bodyParser.urlencoded({extended : false}));
  }

  private routeConfig(): void {
    this.apiApp.use(IndexRouter);
    this.apiApp.use("/mongo/contacts", MongoContactRouter);
    this.apiApp.use("/pg/contacts", PGContactRouter)
  }

  private mongoDBSetup() : void{
    mongoose.connect(this.mongoURL, {useNewUrlParser: true})
  }

}

export default new TSNodeApp().apiApp;