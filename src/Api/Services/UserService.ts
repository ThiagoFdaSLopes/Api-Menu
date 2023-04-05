import md5 from 'md5';
import IUserLogin from '../Interfaces/IUserLogin';
import UserODM from '../../Database/Models/UserODM';
import ClassError from '../../utils/Error/ClassError';
import { createToken } from '../../utils/Token/GenerateToken';

class UserService {
  private _modelODM: UserODM;

  constructor(modelODM: UserODM) {
    this._modelODM = modelODM;
  }

  public async login(user: IUserLogin): Promise<string> {
    try {
      const pass = md5(user.password);
      const UserLogin = { email: user.email, password: pass };
      const result = await this._modelODM.findByOne(UserLogin);
      if (!result) throw new ClassError('Email ou senha incorretos', 404);
      const { email, password, id } = result;
      const token = createToken({ email, password, id });
      return token;
    } catch (error) {
      throw new ClassError(`${(error as Error).message}`, 500);
    }
  }
}

export default UserService;