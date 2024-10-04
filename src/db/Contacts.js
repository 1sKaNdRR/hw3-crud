import { Schema, model } from 'mongoose';
import { contactList } from '../constants/contacts.js';

import { handleSaveError } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name must be exist'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'phoneNumber must be exist'],
    },
    email: {
      type: String,
      required: false,
    },
    isFavorite: {
      type: Boolean,
      default: false,
      require: [true, 'isFavorite must be exist'],
    },
    contactType: {
      type: String,
      enum: contactList,
      required: [true, 'contactType must be exist'],
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);
contactSchema.post('save', handleSaveError);

const ContactCollection = model('contact', contactSchema);

export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavorite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export default ContactCollection;


















// import {Schema, model} from "mongoose";

// import { contactList } from "../constants/contacts.js";

// import { handleSaveError, setUpdateOptions } from "./hooks.js";

// const contactSchema = new Schema({

//     name: {
//         type: String,
//         required: true,
//     },
//     phoneNumber: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: false,
//     },
//     isFavourite: {
//         type: Boolean,
//         default: false,
//     },
//     contactType: {
// 		type: String,
// 		enum: contactList,
// 		required: true,
// 		default: 'personal',
//     },

// }, {versionKey: false, timestamps: true});

// contactSchema.post("save", handleSaveError);

// contactSchema.pre("findOneAndUpdate", setUpdateOptions);

// contactSchema.post("findOneAndUpdate", handleSaveError);

// const ContactCollection = model("contact", contactSchema);

// export const sortFields = ['name', 'phoneNumber', 'email', 'isFavourite', 'contactType', 'createdAt', 'updatedAt'];


// export default ContactCollection;

