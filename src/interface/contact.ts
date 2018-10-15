import {Document} from 'mongoose';
interface Contact{
  firstName: String,
  lastName: String,
  phone: Number,
  contactType : String,
  address : String,
  created_at : Date,
}

interface ContactModelInterface extends Contact, Document {}
export default ContactModelInterface

