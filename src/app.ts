import * as express from 'express';

class TSNodeApp{
  constructor(){
    this.apiApp = express();
  }
  public apiApp : express.Application;
}

export default new TSNodeApp().apiApp;