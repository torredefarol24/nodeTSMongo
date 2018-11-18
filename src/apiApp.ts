import * as express from 'express';
import * as bodyParser from 'body-parser';
import MongoContactRouter from './routes/api/contact';
import AppKeys from './config/keys';
import * as mongoose from 'mongoose';

class TSNodeApiApp{
  constructor(){
    this.apiApp = express();
    this.bodyParserConfig();
    this.routeConfig();
    this.mongoDBSetup();
  }
  
  public apiApp : express.Application;
  // public mongoURL : string = AppKeys.mongoDBURL
  public mongoURL : string = AppKeys.mongoDBDockerURL
  
  private bodyParserConfig(): void {
    this.apiApp.use(bodyParser.json());
    this.apiApp.use(bodyParser.urlencoded({extended : false}));
  }

  private routeConfig(): void {
    this.apiApp.use("/api/contacts", MongoContactRouter);
  }

  private mongoDBSetup() : void{
    mongoose.connect(this.mongoURL, {useNewUrlParser: true}, 
      (err) => {
        if (err){
          console.error("DB Error" , err);
        } else {
          console.log("Connected to MongoDB - API")
        }
      }
    )
  }

}

export default new TSNodeApiApp().apiApp;