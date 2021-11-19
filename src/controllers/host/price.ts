import {Request, Response} from 'express';
import {Price} from '../../models/Price';
import moment from 'moment';
import * as JSON2CSV from 'json2csv';

async function getAllPrices(req : Request, res : Response){
  let priceFindOptions : any = {};
  let contextData : any = {
    msg : "No Prices Found",
    prices : null
  }
  try {
    let prices = await Price.find(priceFindOptions);
    contextData.prices = prices;
    contextData.msg = "Collected Price Feed From DB";
  } catch(error){
    contextData.msg = error;
  }
  return res.render("prices/prices.pug", contextData)
}




async function createNewContact(req: Request, res : Response){
  // let reqFirstName : String = req.body.firstName.trim();
  // let reqLastName : String = req.body.lastName.trim();
  // let reqPhone : Number = req.body.phone;
  // let reqCreatedAt : Date = new Date();
  // let reqAddress : String = req.body.address.trim();
  // let reqContactType : String = req.body.priceType.trim();
  //
  // if (!reqFirstName || !reqLastName || !reqPhone || !reqAddress){
  //   return res.status(404).json({ msg : "Values From request Body missing"});
  // }
  //
  // let instanceContact = new Price();
  // instanceContact.firstName = reqFirstName;
  // instanceContact.lastName = reqLastName;
  // instanceContact.phone = reqPhone;
  // instanceContact.address = reqAddress;
  // instanceContact.priceType = reqContactType;
  // instanceContact.created_at = reqCreatedAt;
  //
  // try {
  //   await instanceContact.save()
  //   return res.redirect("/prices")
  // } catch(error){
  //   return res.redirect("/prices")
  // }
}



async function getPriceById(req: Request, res: Response){
  let priceId : String = req.params.id;
  let contextData : any = {
    msg : "No Price Found" ,
    price : null
  }
  try {
    let priceFromDB = await Price.findById(priceId)
    contextData.data = priceFromDB
    contextData.msg = "Price Found"
  } catch (error){
    contextData.msg = error;
  }
  return res.render("prices/price-details.pug", contextData);
}



async function updatePriceById(req : Request, res :Response){
  let priceId : String = req.params.id;
  let priceFindOptions : any= {
    _id : priceId
  };
  try {
    await Price.findOneAndUpdate(priceFindOptions, req.body);
    return res.redirect("/prices")
  } catch(error){
    return res.redirect("/prices")
  }

}

async function sendAllPricesCSV(req: Request, res : Response){
  let priceFindOptions : any = {};
  let contextData : any = {
    msg : "No Prices Found",
    prices : null
  }
  try {
    let prices = await Price.find(priceFindOptions);
    let priceFieldLabels = [
      { label : "mAsset", value : "mAsset" },
      { label : "priceUST", value : "priceUST" },
      { label : "oraclePriceUST", value : "oraclePriceUST" },
      { label : "premium", value : "premium" },
      { label : "created_at", value : "created_at" }
    ]

    let csvOptions = {
      fields : priceFieldLabels
    }

    let csvData = JSON2CSV.parse(prices, csvOptions)
    const currentTime = moment().format('YYYYMMDDhhmmss');
    let fileName = `Prices_${currentTime}.csv`
    res.attachment(fileName);
    return res.send(csvData);
  } catch(error){
    contextData.msg = error;
  }
  return res.render("prices/prices.pug", contextData)
}


// async function createMultipleCSV(req: Request, res : Response){
//   let allPrices = JSON.parse(req.body.csvPrices);
//   let parsedPrices = allPrices.reduce(function(accumulator, currentVal){
//     currentVal.firstName = currentVal['First Name']
//     currentVal.lastName = currentVal['Last Name']
//     currentVal.address = currentVal['Address']
//     currentVal.priceType = currentVal['Price Type']
//     currentVal.phone = currentVal['Cell']
//
//     delete currentVal["First Name"]
//     delete currentVal['Last Name']
//     delete currentVal["Address"]
//     delete currentVal["Cell"]
//     delete currentVal["Price Type"]
//     accumulator.push(currentVal)
//     return accumulator
//   }, []);
//
//
//   try{
//     let result = await Price.insertMany(parsedPrices);
//     return res.redirect("/prices")
//   } catch(error){
//     console.error("Something went down ", error)
//   }
//
// }



const ControllerMethods : any = {
  showAllPrices : getAllPrices,
  getSinglePrice : getPriceById,
  sendAllCSV : sendAllPricesCSV
}

export default ControllerMethods;
