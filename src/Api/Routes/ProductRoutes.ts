import { Request, Response, Router, NextFunction } from 'express';
import ProductController from '../Controllers/ProductController';
import authMiddleware from '../Middlewares/AuthToken';
import ValidateBodyProduct from '../Middlewares/ValidateBodyProduct';

const productController = new ProductController();

const productRoutes = Router();

productRoutes.post(
  '/',
  ValidateBodyProduct,
  authMiddleware,
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => productController.CreateProduct(req, res, next),
);

productRoutes.patch(
  '/:id',
  authMiddleware,
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => productController.Update(req, res, next),
);

productRoutes.get(
  '/',
  authMiddleware,
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => productController.GetAllProducts(req, res, next),
);

productRoutes.get(
  '/:id',
  authMiddleware,
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => productController.GetProductById(req, res, next),
);

productRoutes.delete(
  '/:id',
  authMiddleware,
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => productController.DeleteProduct(req, res, next),
);

export default productRoutes;