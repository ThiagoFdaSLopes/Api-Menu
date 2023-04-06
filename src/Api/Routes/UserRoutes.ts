import { Request, Response, Router, NextFunction } from 'express';
import UserController from '../Controllers/UserController';
import ValidateBodyLogin from '../Middlewares/ValidateBodyLogin';

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  '/auth/login', 
  ValidateBodyLogin,
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => userController.UserLogin(req, res, next),
);

export default userRouter;