import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(404).json({ message: 'Token not exist' });
  try {
    const decodedToken = jwt.verify(authorization, 'secret-key');
    if (!decodedToken) return res.status(401).json({ message: 'Invalid token' });
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token not found' });
  }
}

export default authMiddleware;