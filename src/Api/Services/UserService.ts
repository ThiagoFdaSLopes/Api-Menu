// import IUserLogin from '../Interfaces/IUserLogin';
import UserODM from '../../Database/Models/UserODM';
// import ClassError from '../../utils/Error/ClassError';

class UserService {
  private _modelODM: UserODM;

  constructor(modelODM: UserODM) {
    this._modelODM = modelODM;
  }

  // public async login(user: IUserLogin): Promise<string> {
    
  // }
}

export default UserService;