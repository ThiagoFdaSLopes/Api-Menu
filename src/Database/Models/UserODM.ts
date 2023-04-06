import { Schema } from 'mongoose';
import IUserLogin from '../../Api/Interfaces/IUserLogin';
import AbstractODM from './AbstractODM';

class UserODM extends AbstractODM<IUserLogin> {
  constructor() {
    const schema = new Schema<IUserLogin>({
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      role: { type: String, required: true },
    }, { versionKey: false, toJSON: { virtuals: true }, id: false });

    super(schema, 'Users');
  }
}

export default UserODM;