import * as mongoose from 'mongoose';
import ContactSchema from '../schemas/contact';
import ContactModelInterface from '../interface/contact';

const modelName = "Contact";
export const Contact = mongoose.model<ContactModelInterface>(modelName, ContactSchema);
