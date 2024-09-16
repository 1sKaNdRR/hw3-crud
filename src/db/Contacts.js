import {Schema, model} from "mongoose";

import { contactList } from "../constants/contacts.js";

import { handleSaveError, setUpdateOptions } from "./hooks.js";

const contactSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    isFavourite: {
        type: Boolean,
        default: false,
        required: true,
    },
    contactType: {
		type: String,
		enum: contactList,
		required: true,
		default: 'personal',
    },

}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateOptions);

contactSchema.post("findOneAndUpdate", handleSaveError);

const ContactCollection = model("contact", contactSchema);

export const sortFields = ['name', 'phoneNumber', 'email', 'isFavourite', 'contactType', 'createdAt', 'updatedAt'];


export default ContactCollection;








// import {Schema, model} from "mongoose";

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
//         required: true,
//     },
//     contactType:{
//         type: String,
//         enum: ["personal", "home"],
//         required: true,
//     },

// }, {versionKey: false, timestamps: true});

// const ContactCollection = model("contact", contactSchema);

// export default ContactCollection;