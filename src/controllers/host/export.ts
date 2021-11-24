import {Request, Response} from 'express';
import {Price} from '../../models/Price';
import moment from 'moment';
import {parseAsync} from 'json2csv';
import {mirrorObject} from '../../middleware/mirror';

async function getAllPrices(req: Request, res: Response) {
    let priceFindOptions: any = {};
    let contextData: any = {
        msg: 'No Prices Found',
        assets: mirrorObject.assetSymbols(),
        activePageExport: "active",
        prices: null
    }
    try {
        contextData.prices = await Price.find(priceFindOptions).sort({ _id: -1 }).limit(1000);
        contextData.msg = 'Collected Price Feed From DB';
    } catch (error) {
        contextData.msg = error;
    }
    return res.render('prices/prices.pug', contextData)
}


async function getPriceById(req: Request, res: Response) {
    let priceId: String = req.params.id;
    let contextData: any = {
        msg: 'No Price Found',
        assets: mirrorObject.assetSymbols(),
        price: null
    }
    try {
        contextData.data = await Price.findById(priceId);
        contextData.msg = 'Price Found'
    } catch (error) {
        contextData.msg = error;
    }
    return res.render('prices/price-details.pug', contextData);
}

async function sendAllPricesCSV(req: Request, res: Response) {
    let priceFindOptions: any = {};
    let contextData: any = {
        msg: 'No Prices Found',
        assets: mirrorObject.assetSymbols(),
        prices: null
    }
    try {
        let prices = await Price.find(priceFindOptions);
        let priceFieldLabels = [
            {label: 'mAsset', value: 'mAsset'},
            {label: 'priceUST', value: 'priceUST'},
            {label: 'oraclePriceUST', value: 'oraclePriceUST'},
            {label: 'premium', value: 'premium'},
            {label: 'created_at', value: row => moment(row.created_at).format('YYYY-MM-DD hh:mm:ss') }
        ]

        let csvOptions = {
            fields: priceFieldLabels
        }
        const csvData = await parseAsync(prices, csvOptions);

        const currentTime = moment().format('YYYY-MM-DD_hh:mm:ss');
        let fileName = `Prices_${currentTime}.csv`
        res.attachment(fileName);
        return res.send(csvData);
    } catch (error) {
        contextData.msg = error;
    }
    return res.render('prices/prices.pug', contextData)
}


const ControllerMethods: any = {
    showAllPrices: getAllPrices,
    getSinglePrice: getPriceById,
    sendAllCSV: sendAllPricesCSV
}

export default ControllerMethods;
