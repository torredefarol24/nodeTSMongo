import {Mirror, Asset, Token} from '@mirror-protocol/mirror.js';

export class MirrorPrices {
    private mirror: Mirror;
    constructor() {
         this.mirror = new Mirror();
    }
}



// for (const [symbol] of Object.entries(mirror.assets)) {
//     const asset = mirror.assets[symbol];
//     const tokenInfo = await asset.token.getTokenInfo();
//     expect(tokenInfo.name).toEqual(asset.name);
//     expect(tokenInfo.symbol).toEqual(asset.symbol);
// }
