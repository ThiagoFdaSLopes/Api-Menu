import { Schema } from 'mongoose';
import { IUserLogin } from '../../Api/Interfaces/IUserLogin';
import AbstractODM from './AbstractODM';

class UserODM extends AbstractODM<IUserLogin> {
  constructor() {
    const schema = new Schema<IUserLogin>({
      email: { type: String, required: true },
      password: { type: String, required: true },
    }, { versionKey: false });

    super(schema, 'Users');
  }
}

export default UserODM;