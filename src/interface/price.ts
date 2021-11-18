import {Document} from 'mongoose';
interface Price{
  mAsset: String,
  priceUST: Number,
  oraclePriceUST: Number,
  premium : Number,
  created_at : Date,
}

interface PriceModelInterface extends Price, Document {}
export default PriceModelInterface

