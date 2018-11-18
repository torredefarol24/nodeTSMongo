import * as express from 'express';
import * as bodyParser from 'body-parser';
import IndexRouter from './routes/host';
import ContactsRouter from './routes/host/contact';
import AppKeys from './config/keys';
import * as mongoose from 'mongoose';

class TSNodeHostApp{
  constructor(){
    this.hostApp = express();
    this.bodyParserConfig();
    this.routeConfig();
    this.mongoDBSetup();
    this.staticFilesSetup();
  }
  
  public hostApp : express.Application;
  // public mongoURL : string = AppKeys.mongoDBURL
  public mongoURL : string = AppKeys.mongoDBDockerURL

  private bodyParserConfig(): void {
    this.hostApp.use(bodyParser.json());
    this.hostApp.use(bodyParser.urlencoded({extended : false}));
  }

  private routeConfig(): void {
    this.hostApp.use(IndexRouter);
    this.hostApp.use("/contacts", ContactsRouter);
  }

  private mongoDBSetup() : void{
    mongoose.connect(this.mongoURL, {useNewUrlParser: true}, 
      (err) => {
        if (err){
          console.error("DB Error" , err);
        } else {
          console.log("Connected to MongoDB - Host App")
        }
      }
    )
  }

  private staticFilesSetup(){
    this.hostApp.use(express.static('public'));
  }

}

export default new TSNodeHostApp().hostApp;