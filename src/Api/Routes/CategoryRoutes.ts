import { Request, Response, Router, NextFunction } from 'express';
import CategoryController from '../Controllers/CategoryController';

const categoryController = new CategoryController();

const categoryRouter = Router();

categoryRouter.get('/', (
  req: Request, 
  res: Response, 
  next: NextFunction,
) => categoryController.GetAllCategorys(req, res, next));

export default categoryRouter;