import Joi from 'joi';
import { enumList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  isFavorite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...enumList)
    .required(),
  photo: Joi.string().uri(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().valid(...enumList),
  photo: Joi.string().uri(),
});
