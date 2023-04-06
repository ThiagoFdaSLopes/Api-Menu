import { Schema } from 'mongoose';
import IProducts from '../../Api/Interfaces/IProducts';
import AbstractODM from './AbstractODM';

class ProductODM extends AbstractODM<IProducts> {
  constructor() {
    const schema = new Schema<IProducts>({
      categories: { type: [String], required: true },
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
    }, { versionKey: false, toJSON: { virtuals: true }, id: false });

    super(schema, 'Products');
  }
}

export default ProductODM;