import * as mongoose from 'mongoose';

const contactSchemaOptions = {
  firstName : {
    type : String,
    required : "Provide First Name"
  },
  lastName : {
    type : String,
    required : "Provide Last Name"
  },
  phone : {
    type : Number
  },
  created_at : {
    type: Date,
    default : Date.now
  }
}

const ContactSchema = new mongoose.Schema(contactSchemaOptions);

export default ContactSchema 

