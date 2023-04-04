import { NextFunction, Request, Response } from 'express';
import IError from '../Interfaces/IError';

class ErrorHandler {
  public static handle(
    error: IError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export default ErrorHandler;