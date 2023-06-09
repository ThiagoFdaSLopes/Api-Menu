import ICategory from '../Interfaces/ICategory';
import CategoryODM from '../../Database/Models/CategoryODM';
import ClassError from '../../utils/Error/ClassError';

class CategoryService {
  private _modelODM: CategoryODM;

  constructor(modelODM: CategoryODM) {
    this._modelODM = modelODM;
  }

  public async getAllCategorys(): Promise<ICategory[]> {
    try {
      const result = await this._modelODM.findAll();
      if (!result) throw new ClassError('Categorys error', 500);
      return result;
    } catch (error) {
      if (error instanceof ClassError) {
        throw new ClassError(`${(error as Error).message}`, error.status);
      }
      throw new ClassError('Erro interno do servidor', 500);
    }
  }
}

export default CategoryService;