import {Request, Response} from 'express';
import {Price} from '../../models/Price';

async function getAllPrices(req : Request, res : Response){
  let priceFindOptions : any = {};
  let jsonResp : any= {
    msg : "Prices Found",
    method : `${req.method}`,
    data : null
  };
  let httpStatus = 200;

  try {
    let prices = await Price.find(priceFindOptions);
    jsonResp.data = prices;
    jsonResp.success = true;
  } catch(error){
    jsonResp.msg = error;
    jsonResp.success = false;
    httpStatus = 500
  }
  return res.status(httpStatus).json(jsonResp)
}

async function createNewPrice(req: Request, res : Response){
  // let reqFirstName : String = req.body.firstName.trim();
  // let reqLastName : String = req.body.lastName.trim();
  // let reqPhone : Number = req.body.phone;
  // let reqAddress : String = req.body.address.trim();
  // let reqPriceType : String = req.body.contactType.trim();
  // let reqCreatedAt : Date = req.body.created_at.trim();
  //
  // if (!reqFirstName || !reqLastName || !reqPhone || !reqAddress){
  //   return res.status(404).json({ msg : "Values From request Body missing"});
  // }
  //
  // let instancePrice = new Price();
  // instancePrice.firstName = reqFirstName;
  // instanceContact.lastName = reqLastName;
  // instanceContact.phone = reqPhone;
  // instanceContact.contactType = reqContactType;
  // instanceContact.address = reqAddress;
  // instanceContact.created_at = reqCreatedAt;
  //
  // let jsonResp : any = {
  //   msg : "Create new contact",
  //   method : `${req.method}`,
  // }
  //
  // let httpStatus : number= 200;
  //
  // try {
  //   let contact = await instancePrice.save()
  //   jsonResp.data = contact;
  //   jsonResp.success = true;
  // } catch(error){
  //   jsonResp.success = false;
  //   jsonResp.msg = error;
  //   httpStatus = 500;
  // }
  // return res.status(httpStatus).json(jsonResp)

}

async function getPriceById(req: Request, res: Response){
  let priceId : String = req.params.id;
  let jsonResp : any = {
    msg : "Price Found" ,
    method : `${req.method}`,
  }
  let httpStatus : number = 200;

  try {
    let priceFromDB = await Price.findById(priceId)
    jsonResp.data = priceFromDB
    jsonResp.success = true;
  } catch (error){
    jsonResp.msg = error;
    jsonResp.success = false;
    httpStatus = 500;
  }
  return res.status(httpStatus).json(jsonResp);
}

async function updatePriceById(req : Request, res :Response){
  let priceId : String = req.params.id;
  let priceFindOptions : any= {
    _id : priceId
  };

  let jsonResp : any = {
    msg : "Edit Price",
    method : `${req.method}`
  };

  let httpStatus : number= 200;

  try{
    let priceToEdit = await Price.findOneAndUpdate(priceFindOptions, req.body);
    let editedPrice = await Price.findById(priceFindOptions);
    jsonResp.data = editedPrice;
    jsonResp.success = true;
  } catch(error){
    httpStatus = 500;
    jsonResp.success = false;
    jsonResp.msg = error;
  }

  return res.status(httpStatus).json(jsonResp);
}

async function deletePriceById(req : Request, res : Response){
  let priceId : String = req.params.id;
  let priceFindOptions : any = {
    _id : priceId
  };

  let jsonResp : any = {
    msg : "Delete Price",
    method : `${req.method}`
  };
  let httpStatus = 200;

  try {
    await Price.remove(priceFindOptions)
    jsonResp.success = true;
  } catch(error){
    jsonResp.success = false;
    jsonResp.msg = error;
    httpStatus = 500;
  }

  return res.status(httpStatus).json(jsonResp);
}


const ControllerMethods : any = {
  showAllPrices : getAllPrices,
  createPrice : createNewPrice,
  getSinglePrice : getPriceById,
}

export default ControllerMethods;
