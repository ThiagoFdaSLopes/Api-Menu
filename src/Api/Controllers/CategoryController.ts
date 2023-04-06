import { Request, Response, NextFunction } from 'express';
// import ICategory from '../Interfaces/ICategory';
import CategoryODM from '../../Database/Models/CategoryODM';
import CategoryService from '../Services/CategoryService';

class CategoryController {
  constructor(private categoryService = new CategoryService(new CategoryODM())) {}

  public async GetAllCategorys(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const category = await this.categoryService.getAllCategorys();
      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
