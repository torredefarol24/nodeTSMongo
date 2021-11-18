import {Mirror, TerraswapPair, Asset, Token} from '@mirror-protocol/mirror.js';
import {Price} from '../models/Price'

export class MirrorPricesFeed {
    private mirror: Mirror;

    constructor() {
         this.mirror = new Mirror();
    }

    public async fetchFromMirrorAndUpdateDB() {
        for (const [symbol] of Object.entries(this.mirror.assets)) {
            if (symbol == 'MIR') continue;
            const asset = this.mirror.assets[symbol];
            const tokenInfo = await asset.token.getTokenInfo();
            const priceLine = new Price();
            priceLine.mAsset = tokenInfo.symbol;
            const pair = await asset.pair.getPool();
            priceLine.priceUST = Number(pair.assets[0].amount)/Number(pair.assets[1].amount);
            priceLine.oraclePriceUST = Number((await this.mirror.oracle.getPrice(asset.token.contractAddress as string, 'uusd')).rate);
            priceLine.premium = 1.0 - Number(priceLine.oraclePriceUST) / Number(priceLine.priceUST);
            await priceLine.save();
        }
    }
}
