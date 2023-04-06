import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const SchemaBodyLogin = Joi.object({
  categories: Joi.array().items(Joi.string()).min(1).required()
    .label('Categories'),
  name: Joi.string().min(3).max(24).required()
    .label('Name'),
  qty: Joi.number().required().label('Quantity'),
  price: Joi.number().required().label('Price'),
});

const ValidateBodyProduct = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = SchemaBodyLogin.validate(req.body);
    if (error) return res.status(422).json({ message: error.message });
    next();
  } catch (error) {
    return res.status(404).json({ message: (error as Error).message });
  }
};

export default ValidateBodyProduct;