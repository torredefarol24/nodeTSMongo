import {Request, Response} from 'express';

function indexPage(req : Request, res : Response){
  let context = {
    hostName : req.hostname,
    message : "Wow Typescript & Node",
  };
  res.render("index/home.pug", context)
}

function aboutPage(req : Request, res : Response){
  let context = {
    hostName : req.hostname,
    message : "About Us",
  };
  res.render("index/about.pug", context)
}

const ControllerMethods = {
  renderIndexPage : indexPage,
  renderAboutPage : aboutPage
}

export default ControllerMethods

