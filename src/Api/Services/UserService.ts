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

  public async login(user: IUserLogin): Promise<string | undefined> {
    try {
      const pass = md5(user.password);
      const UserLogin = { email: user.email, password: pass };
      const result = await this._modelODM.findByOne(UserLogin);
      if (!result) throw new ClassError('Email ou senha incorretos', 404);
      const { email, password, id } = result;
      const token = createToken({ email, password, id });
      return token;
    } catch (error) {
      if (error instanceof ClassError) {
        throw new ClassError(`${(error as Error).message}`, error.status);
      }
      throw new ClassError('Erro interno do servidor', 500);
    }
  }
}

export default UserService;