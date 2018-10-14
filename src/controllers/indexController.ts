import {Request, Response} from 'express';

function welcome(req: Request, res: Response){
    return res.status(200).json({ message : `Hey ${req.hostname} User`});
  }
  
function indexPage(req : Request, res : Response){
    let context = {
      hostName : req.hostname,
      message : "Wow Stupid Typescript & Express"
    };
    return res.status(200).json(context);
  }
  
function sendData(req : Request, res: Response){
    let requestData = req.body
    return res.status(200).json({ data : requestData})
  }


const ControllerMethods = {
  indexMethod : welcome,
  renderIndexPage : indexPage,
  handlePost : sendData,

}

export default ControllerMethods

