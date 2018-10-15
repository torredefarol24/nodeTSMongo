import {Request, Response} from 'express';

function welcome(req: Request, res: Response){
  return res.status(200).json({ message : `Hey ${req.hostname} User`});
}
  
function indexPage(req : Request, res : Response){
  let context = {
    hostName : req.hostname,
    message : "Wow Typescript & Express",
  };
  res.render("index/index.pug", context)
}

const ControllerMethods = {
  indexMethod : welcome,
  renderIndexPage : indexPage,
}

export default ControllerMethods

