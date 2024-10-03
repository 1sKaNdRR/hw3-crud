// import * as authServices from '../services/auth.js';

// const setupSession = (res, session) => {
//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expire: new Date(Date.now() + session.refreshTokenValidUntil),
//   });
//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     expire: new Date(Date.now() + session.refreshTokenValidUntil),
//   });
// };

// export const signupController = async (req, res) => {
//   const newUser = await authServices.signup(req.body);
//   res.status(201).json({
//     status: 201,
//     message: 'Successfully registered a user!',
//     data: newUser,
//   });
// };
// export const signinController = async (req, res) => {
//   const session = await authServices.signin(req.body);
//   setupSession(res, session);
//   res.json({
//     status: 200,
//     message: 'Successfully signin',
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };
// export const refreshController = async (req, res) => {
//   const { refreshToken, sessionId } = req.cookies;
//   const session = await authServices.refreshSession({
//     refreshToken,
//     sessionId,
//   });
//   setupSession(res, session);
//   res.json({
//     status: 200,
//     message: 'Successfully refresh session',
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };
// export const signoutController = async (req, res) => {
//   const { sessionId } = req.cookies;

//   if (sessionId) {
//     await authServices.signout(sessionId);
//   }
//   res.clearCookie('sessionId');
//   res.clearCookie('refreshToken');

//   res.status(204).send();
// };

import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contact.js';

export const getAllContactsController = async (req, res, next) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const { _id: userId } = req.user;

  const data = await contactServices.getAllContacts({
    userId,
    perPage,
    page,
    sortBy,
    sortOrder,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.getContactById(id);
  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};
export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await contactServices.createContact({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Contact add successfully',
    data,
  });
};
export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await contactServices.updateContact(
    { _id: id, userId },
    req.body,
    { upsert: true },
  );

  const status = isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: isNew
      ? 'Contact created successfully'
      : 'Contact updated successfully',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await contactServices.updateContact(
    { _id: id, userId },
    req.body,
  );

  if (!result) {
    throw createHttpError(404, `Contact whith id=${id} not found`);
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};
export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.deleteContact({ _id: id, userId });
  if (!data) {
    throw createHttpError(404, `Contact whith id=${id} not found`);
  }
  res.status(204).send();
};