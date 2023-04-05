import { NextFunction, Request, Response } from 'express';
import UserODM from '../../Database/Models/UserODM';
import UserService from '../Services/UserService';
import IUserLogin from '../Interfaces/IUserLogin';

class UserController {
  constructor(private userService = new UserService(new UserODM())) {}

  public async UserLogin(
    req: Request, 
    res: Response, 
    next: NextFunction,
  ): Promise<Response | undefined> {
    const body: IUserLogin = { ...req.body };
    try {
      const user = await this.userService.login(body);
      return res.status(200).json({ token: user });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;