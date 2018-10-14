import {Document} from 'mongoose';
interface Contact{
  firstName: String,
  lastName: String,
  phone: Number,
  created_at : Date,
}

interface ContactModelInterface extends Contact, Document {}
export default ContactModelInterface

