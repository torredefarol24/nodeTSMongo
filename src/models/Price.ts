import mongoose from 'mongoose';
import PriceSchema from '../schemas/price';
import PriceModelInterface from '../interface/price';

const modelName = "Price";
export const Price = mongoose.model<PriceModelInterface>(modelName, PriceSchema);
