import { Request, Response, Router, NextFunction } from 'express';
import CategoryController from '../Controllers/CategoryController';
import authMiddleware from '../Middlewares/AuthToken';

const categoryController = new CategoryController();

const categoryRouter = Router();

categoryRouter.get(
  '/',
  authMiddleware, 
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => categoryController.GetAllCategorys(req, res, next),
);

export default categoryRouter;