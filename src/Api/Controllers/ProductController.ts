import { NextFunction, Request, Response } from 'express';
import ProductODM from '../../Database/Models/ProductODM';
import ProductService from '../Services/ProductService';
import IProducts from '../Interfaces/IProducts';
import ClassError from '../../utils/Error/ClassError';

class ProductController {
  constructor(private productService = new ProductService(new ProductODM())) {}

  public async GetAllProducts(
    _req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const result: IProducts[] = await this.productService.getAllProducts();
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
      const result = await this.productService.getProductById(id);
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
      const result = await this.productService.deleteProduct(id);
      return res.status(202).json({ deleted: result });
    } catch (error) {
      next(error);
    }
  }

  public async CreateProduct(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { userInfo } = req.body;
    try {
      if (userInfo.role !== 'admin') throw new ClassError('User not admin', 404);
      const result: IProducts = await this.productService.createProduct(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async Update(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { id } = req.params;
    const { userInfo } = req.body;
    try {
      if (userInfo.role !== 'admin') throw new ClassError('User not admin', 404);
      const result = await this.productService.updateProduct(req.body, id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;