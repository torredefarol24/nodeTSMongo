import {Request, Response} from 'express';
import pug from 'pug';
import {Price} from '../../models/Price';
import PriceModelInterface from '../../interface/price';
import moment from 'moment';
import {mirrorObject} from '../../middleware/mirror';

async function AssetChart(req: Request, res: Response) {
    let assetName : String = req.params.asset;
    const assets = mirrorObject.assetSymbols();

    const baseTimeDB = await Price.aggregate([
                    {$match: {mAsset: assetName}},
                    {$group:{ _id: null, minDate: {$min: '$created_at'}}}]).limit(1);
    const baseTime = baseTimeDB ? new Date(baseTimeDB[0].minDate).valueOf() : Date.now();

    //query mean and standard deviation
    const statQuery = await Price.aggregate([
        {$match: {mAsset: assetName}},
        {$group:{
            _id: null,
            meanPremium: {$avg: '$premium'},
            stdDev: {$stdDevPop: '$premium'}}}]).limit(1);
    const meanPremium = statQuery ? statQuery[0].meanPremium : 0;
    const stdDev = statQuery ? statQuery[0].stdDev : 0;


    let dataFeed: {x: Number, y: Number }[] = [];
    let dataFeedMean: {x: Number, y: Number }[] = [];
    let dataFeedExtremum1: {x: Number, y: Number }[] = [];
    let dataFeedExtremum2: {x: Number, y: Number }[] = [];
    let dataFeedExtremum3: {x: Number, y: Number }[] = [];

    const allDocuments = await Price.find({mAsset: assetName});
    for (let doc of allDocuments ) {
            dataFeed.push({x: (doc.created_at.valueOf() - baseTime), y: doc.premium});
            dataFeedMean.push({x: (doc.created_at.valueOf() - baseTime), y: meanPremium});
            if (Math.abs(doc.premium as number) > Math.abs(meanPremium) + stdDev)
                dataFeedExtremum1.push({x: (doc.created_at.valueOf() - baseTime), y: doc.premium});
            if (Math.abs(doc.premium as number) > Math.abs(meanPremium) + 2*stdDev)
                dataFeedExtremum2.push({x: (doc.created_at.valueOf() - baseTime), y: doc.premium});
            if (Math.abs(doc.premium as number) > Math.abs(meanPremium) + 3*stdDev)
                dataFeedExtremum3.push({x: (doc.created_at.valueOf() - baseTime), y: doc.premium});
    }

    let contextData = {
        hostName: req.hostname,
        assets: assets,
        assetName: `"${assetName}"`,
        activePageAsset: "active",
        message: `${assetName} Premium Over Time`,
        baseTime: baseTime,
        dataColumns: JSON.stringify(dataFeed),
        dataColumnsMean: JSON.stringify(dataFeedMean),
        dataColumnsExtremum1: JSON.stringify(dataFeedExtremum1),
        dataColumnsExtremum2: JSON.stringify(dataFeedExtremum2),
        dataColumnsExtremum3: JSON.stringify(dataFeedExtremum3),
    }

    res.render('asset/asset.pug', contextData)

}

const ControllerMethods = {
    renderAssetChart: AssetChart
}

export default ControllerMethods

