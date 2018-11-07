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
    type : String,
    required : "Provide Phone"
  },
  contactType : {
    type : String,
    default : "Other"
  },
  address : {
    type : String,
    required : "Provide Address"
  },
  created_at : {
    type: Date,
    default : Date.now
  }
}

const ContactSchema = new mongoose.Schema(contactSchemaOptions);

export default ContactSchema 

