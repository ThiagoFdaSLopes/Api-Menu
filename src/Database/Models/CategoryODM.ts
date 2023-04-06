import { Schema } from 'mongoose';
import ICategory from '../../Api/Interfaces/ICategory';
import AbstractODM from './AbstractODM';

class CategoryODM extends AbstractODM<ICategory> {
  constructor() {
    const schema = new Schema<ICategory>({
      parent: { type: String, default: null },
      name: { type: String, required: true },
    }, { versionKey: false, toJSON: { virtuals: true }, id: false });

    super(schema, 'Category');
  }
}

export default CategoryODM;