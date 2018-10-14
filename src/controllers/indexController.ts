import {Request, Response} from 'express';

function sayHello(req: Request, res: Response){
  return res.status(200).json({ message : `Hey ${req.hostname} User`})
}

function renderIndex(req : Request, res : Response){
  let context = {
    hostName : req.hostname,
    message : "Wow Stupid Typescript & Express"
  };
  return res.status(200).json(context);
}

function showPostData(req : Request, res: Response){
  let requestData = req.body
  return res.status(200).json({ data : requestData})
}
  
const ControllerMethods = {
  indexMethod : sayHello,
  renderIndexPage : renderIndex,
  handlePost : showPostData
}

export default ControllerMethods