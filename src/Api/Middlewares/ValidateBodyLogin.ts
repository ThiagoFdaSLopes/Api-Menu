import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const SchemaBodyLogin = Joi.object({
  email: Joi.string().email().required().label('E-mail'),
  password: Joi.string().min(5).max(24).required()
    .label('Password'),
});

const ValidateBodyLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = SchemaBodyLogin.validate(req.body);
    if (error) return res.status(422).json({ message: error.message });
    next();
  } catch (error) {
    return res.status(404).json({ message: (error as Error).message });
  }
};

export default ValidateBodyLogin;