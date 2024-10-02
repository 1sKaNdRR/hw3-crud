import { Router } from 'express';

import * as authControllers from '../controllers/auth.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { userSigninSchema, userSignupSchema } from '../validation/users.js';
const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController),
);
authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController),
);
authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));
export default authRouter;
authRouter.post('/logout', ctrlWrapper(authControllers.signoutController));










// import {Router} from "express";

// import * as authControllers from "../controllers/auth.js";

// import ctrlWrapper from "../utils/ctrlWrapper.js";
// import validateBody from "../utils/validateBody.js";

// import { userSignupSchema, userSigninSchema } from "../validation/users.js";

// const authRouter = Router();

// authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(authControllers.registerController));

// authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(authControllers.loginController));

// authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));

// authRouter.post("/logout", ctrlWrapper(authControllers.logoutController));

// export default authRouter;