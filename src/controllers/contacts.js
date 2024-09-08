import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
    const data = await contactServices.getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts',
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
    message: `Contact with ${id} successfully find`,
    data,
  });
};

export const addContactController = async(req, res)=> {
  const data = await contactServices.createContact(req.body);
  
  res.status(201).json({
    status: 201,
    message: "Contact add successfully",
    data,
  });
};

export const upsertContactController = async(req, res)=> {
  const {id} = req.params;
  const {isNew, data} = await contactServices.updateContact({_id: id}, req.body, {upsert: true});

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: "Contact upsert successfully",
    data,
  });
};

export const patchContactController = async(req, res)=> {
  const {id} = req.params;
  const result = await contactServices.updateContact({_id: id}, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: "Contact patched successfully",
    data: result.data,
  });
};

export const deleteContactController = async(req, res)=> {
  const {id} = req.params;
  const data = await contactServices.deleteContact({_id: id});

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};





// урок

// import createHttpError from 'http-errors';

// import * as movieServices from '../services/movies.js';

// export const getAllMoviesController = async (req, res) => {
//     const data = await movieServices.getAllMovies();

//     res.json({
//       status: 200,
//       message: 'Successfully found movies',
//       data,
//     });
// };

// export const getMovieByIdController = async (req, res) => {
//   const { id } = req.params;
//   const data = await movieServices.getMovieById(id);

//   if (!data) {
//     throw createHttpError(404, `Movie with id=${id} not found`);
//   }

//   res.json({
//     status: 200,
//     message: `Movie with ${id} successfully find`,
//     data,
//   });
// };

// export const addMovieController = async(req, res)=> {
//   const data = await movieServices.createMovie(req.body);
  
//   res.status(201).json({
//     status: 201,
//     message: "Movie add successfully",
//     data,
//   });
// };

// export const upsertMovieController = async(req, res)=> {
//   const {id} = req.params;
//   const {isNew, data} = await movieServices.updateMovie({_id: id}, req.body, {upsert: true});

//   const status = isNew ? 201 : 200;

//   res.status(status).json({
//     status,
//     message: "Movie upsert successfully",
//     data,
//   });
// };

// export const patchMovieController = async(req, res)=> {
//   const {id} = req.params;
//   const result = await movieServices.updateMovie({_id: id}, req.body);

//   if (!result) {
//     throw createHttpError(404, `Movie with id=${id} not found`);
//   }

//   res.json({
//     status: 200,
//     message: "Movie patched successfully",
//     data: result.data,
//   });
// };

// export const deleteMovieController = async(req, res)=> {
//   const {id} = req.params;
//   const data = await movieServices.deleteMovie({_id: id});

//   if (!data) {
//     throw createHttpError(404, `Movie with id=${id} not found`);
//   }

//   res.status(204).send();
// };