import {Mirror, TerraswapPair, Asset, Token} from '@mirror-protocol/mirror.js';
import {Price} from '../models/Price'
import {LCDClient, Coin} from '@terra-money/terra.js';

export class MirrorPricesFeed {
    private mirror: Mirror;
    private terra: LCDClient;

    constructor() {
        this.mirror = new Mirror();
        this.terra = new LCDClient({
            URL: 'https://lcd.terra.dev',
            chainID: 'columbus-5',
        });
    }

    public async fetchFromMirrorAndUpdateDB() {
        const bLunaContractAddress = "terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p";
        const uLunabLunaSwapRate: TerraswapPair.SimulationResponse = await this.terra.wasm.contractQuery(
            bLunaContractAddress,
            {
                simulation: {
                    offer_asset: {
                        amount: "1000000",
                        info: {
                            native_token: {
                                denom: "uluna"
                            }
                        }
                    }
                }
            }
        );
        const ubLunaSwapPrice = new Price();
        ubLunaSwapPrice.mAsset = 'uLuna-bLuna';
        ubLunaSwapPrice.priceUST = 1;
        ubLunaSwapPrice.oraclePriceUST = 1;
        ubLunaSwapPrice.premium = Number(uLunabLunaSwapRate.return_amount) / 1000000.0;
        await ubLunaSwapPrice.save();

        for (const [symbol] of Object.entries(this.mirror.assets)) {
            if (symbol == 'MIR') continue;
            const asset = this.mirror.assets[symbol];
            const tokenInfo = await asset.token.getTokenInfo();
            const priceLine = new Price();
            priceLine.mAsset = tokenInfo.symbol;
            const pair = await asset.pair.getPool();
            priceLine.priceUST = Number(pair.assets[0].amount) / Number(pair.assets[1].amount);
            priceLine.oraclePriceUST = Number((await this.mirror.oracle.getPrice(asset.token.contractAddress as string, 'uusd')).rate);
            priceLine.premium = 1.0 - Number(priceLine.oraclePriceUST) / Number(priceLine.priceUST);
            await priceLine.save();
        }
    }
}
