import {Request, Response} from 'express';

function indexPage(req : Request, res : Response){
  let context = {
    hostName : req.hostname,
    message : "Mirror Protocol Realtime Price Feed",
  };
  res.render("index/home.pug", context)
}

const ControllerMethods = {
  renderIndexPage : indexPage
}

export default ControllerMethods

