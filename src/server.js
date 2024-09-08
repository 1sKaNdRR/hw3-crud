import express from "express";
import cors from "cors";

import { env } from "./utils/env.js";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "../src/middlewares/loger.js";

import contactsRouter from "./routers/contacts.js";

export const startServer = ()=> {
    const app = express();

    app.use(logger);
    app.use(cors());
    app.use(express.json());

    app.use("/contacts", contactsRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

    const port = Number(env("PORT", 3000));

    app.listen(port, ()=> console.log("Server running on port 3000"));
};





// import express from "express";
// import cors from "cors";

// import { env } from "./utils/env.js";

// import * as contactServices from "./services/contacts.js";

// export const startServer = ()=>{
//     const app = express();

//     app.use(cors());
//     app.use(express.json());

//     app.get("/contacts", async (req, res)=> {
//         const data = await contactServices.getAllContacts();

//         res.json({
//             status: 200,
//             message: "Successfully found contacts!",
//             data,
//         });
//     });

//     app.get("/contacts/:ContactId", async(req, res)=> {
//         const {ContactId} = req.params;
//         const data = await contactServices.getContactById(ContactId);

//         if(!data) {
//             return res.status(404).json({
//                 message: `Contact with id=${ContactId} not found`
//             });
//         }

//         res.json({
//             status: 200,
//             message: `Contact with ${ContactId} successfully find`,
//             data,
//         });
//     });

//     app.use((req, res)=> {
//         res.status(404).json({
//             message: `${req.url} not found`
//         });
//     });

//     app.use((error, req, res, next)=> {
//         res.status(500).json({
//             message: error.message,
//         });
//     });


//     const port = Number(env("PORT", 3000));

//     app.listen(port, ()=> console.log("Server running on port 3000"));
// };
