import { isValidObjectId } from 'mongoose';
import IProducts from '../Interfaces/IProducts';
import ProductODM from '../../Database/Models/ProductODM';
import ClassError from '../../utils/Error/ClassError';

class ProductService {
  private _modelODM: ProductODM;

  constructor(modelODM: ProductODM) {
    this._modelODM = modelODM;
  }

  public async getAllProducts(): Promise<IProducts[]> {
    try {
      const result = await this._modelODM.findAll();
      return result;
    } catch (error) {
      if (error instanceof ClassError) {
        throw new ClassError(`${(error as Error).message}`, error.status);
      }
      throw new ClassError('Erro interno do servidor', 500);
    }
  }

  public async getProductById(id: string): Promise<IProducts | null> {
    try {
      if (!isValidObjectId(id)) throw new ClassError('Invalid Object id', 422);
      const result = await this._modelODM.findById(id);
      if (!result) throw new ClassError('Product Id Not Found', 404);
      return result;
    } catch (error) {
      if (error instanceof ClassError) {
        throw new ClassError(`${(error as Error).message}`, error.status);
      }
      throw new ClassError('Erro interno do servidor', 500);
    }
  }

  public async deleteProduct(id: string): Promise<IProducts> {
    try {
      if (!isValidObjectId(id)) throw new ClassError('Invalid Object id', 422);
      const result = await this._modelODM.deleteProduct(id);
      if (!result) throw new ClassError('Product Id Not Found', 404);
      return result;
    } catch (error) {
      if (error instanceof ClassError) {
        throw new ClassError(`${(error as Error).message}`, error.status);
      }
      throw new ClassError('Erro interno', 500);
    }
  }
}

export default ProductService;