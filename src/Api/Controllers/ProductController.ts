import { NextFunction, Request, Response } from 'express';
import ProductODM from '../../Database/Models/ProductODM';
import ProductService from '../Services/ProductService';
import IProducts from '../Interfaces/IProducts';

class ProductController {
  constructor(private productController = new ProductService(new ProductODM())) {}

  public async GetAllProducts(
    _req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const result: IProducts[] = await this.productController.getAllProducts();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async GetProductById(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { id } = req.params;
    try {
      const result = await this.productController.getProductById(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async DeleteProduct(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { id } = req.params;
    try {
      const result = await this.productController.deleteProduct(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;