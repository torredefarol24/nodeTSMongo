import mongoose from 'mongoose';

const priceSchemaOptions = {
  mAsset : {
    type : String,
    required : "Provide Mirror Asset Name"
  },
  priceUST : {
    type : Number,
    required : "Provide Mirror price in UST"
  },
  oraclePriceUST : {
    type : Number,
    required : "Provide real price in UST"
  },
  premium : {
    type : Number,
    default : 0
  },
  created_at : {
    type: Date,
    default : Date.now
  }
}

const PriceSchema = new mongoose.Schema(priceSchemaOptions);

export default PriceSchema

