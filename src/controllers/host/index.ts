import {Request, Response} from 'express';
import {bb, area, bar, zoom} from 'billboard.js';
import pug from 'pug';
import {Price} from '../../models/Price';
import PriceModelInterface from '../../interface/price';
import moment from 'moment';
import {MirrorPricesFeed} from '../../middleware/mirror';

async function indexPage(req: Request, res: Response) {
    const mirrorObject = new MirrorPricesFeed();
    const assets = mirrorObject.assetSymbols();

    //getting the timeline with minute precisoin
    const timeFromDB = await Price.find({}, 'created_at -_id').sort({created_at: 1});
    let timeAxis: (string)[] = [];
    let timeAxisOriginal: (Date)[] = [];
    for (let item of timeFromDB) {
        let dateTime = `${moment(item.created_at).format('YYYY-MM-DD hh:mm')}`;
        if (!timeAxis.includes(dateTime)) {
            timeAxis.push(dateTime);
            timeAxisOriginal.push(item.created_at);
        }
    }

    //let's move along timeframe and get all average of all values within a minute

    let pricesToDisplay: (string | number)[][] = [];
    let timeAxisString: (string)[] = [];
    timeAxisString.push('"x"');

    for (let asset of assets) {
        pricesToDisplay[asset] = [];
        pricesToDisplay[asset].push(`"${asset}"`)
    }

    for (let timeIndexFrom = 0; timeIndexFrom < timeAxis.length;) {
        let timeIndexTo = timeIndexFrom + 1;
        let datemin = timeAxisOriginal[timeIndexFrom];
        for (; timeIndexTo < timeAxis.length; timeIndexTo++ ) {
            let datemax = timeAxisOriginal[timeIndexTo];
            //find average of premium between a given date range
            let aggregatedPremium = await Price.aggregate([
                {$match: {created_at: {$gte: datemin, $lt: datemax}}},
                {
                    $group:
                        {
                            _id: '$mAsset',
                            avgPremium: {$avg: '$premium'}
                        },
                }
            ]);

            if (aggregatedPremium && aggregatedPremium.length == assets.length) {
                timeAxisString.push(`"${timeAxis[timeIndexFrom]}"`);
                for(let aggregatedPremiumForAsset of aggregatedPremium) {
                    pricesToDisplay[aggregatedPremiumForAsset._id].push(aggregatedPremiumForAsset.avgPremium.toFixed(3));
                }
                break;
            }
        }
        timeIndexFrom = timeIndexTo;
    }


    let outputString = "";
    for (let asset of assets) {
        outputString += `[${pricesToDisplay[asset]}],`;
    }

    let context = {
        hostName: req.hostname,
        message: 'mAssets Premium Over Time',
        dataColumns: `[${outputString} [${timeAxisString}]]`,
        // chart: bb.generate({
        //     data: {
        //         columns: [
        //             ["sample", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40],
        //             ["sample2", 60, 600, 200, 400, 150, 450, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
        //         ],
        //         type: "line", // for ESM specify as: line()
        //     },
        //     zoom: {
        //         enabled: true, // for ESM specify as: zoom()
        //         type: "drag"
        //     },
        //     bindto: "#dragZoom"
        // })
    }

    // const render = pug.compileFile('index/home.pug');
    // res.render({
    //   testFunc: function () {
    //     return "Test func";
    //   }
    // });

    res.render('index/home.pug', context)

    // // script(type='text/javascript').
    //     var chart = bb.generate({
    //   data: {
    //     columns: #{dataColumns},
    //     type: "line", // for ESM specify as: line()
    //   },
    //   zoom: {
    //     enabled: true, // for ESM specify as: zoom()
    //     type: "drag"
    //   },
    //   bindto: "#dragZoom"
    // });

}

const ControllerMethods = {
    renderIndexPage: indexPage
}

export default ControllerMethods

