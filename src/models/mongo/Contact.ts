import * as mongoose from 'mongoose';
import ContactSchema from '../../schemas/mongo/contactSchema';

const Contact = mongoose.model(ContactSchema)

export default Contact