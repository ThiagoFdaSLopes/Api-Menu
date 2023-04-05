import jwt, { SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import IUserLogin from '../../Api/Interfaces/IUserLogin';

export const createToken = (body: IUserLogin) => {
  const configToken: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };
  const secret = fs.readFileSync(`${__dirname}/jwt.key`, { encoding: 'utf-8' });
  return jwt.sign(body, secret, configToken);
};

export default createToken;