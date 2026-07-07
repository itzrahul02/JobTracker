import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import { getCollection } from '../config/db';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token) as any; 
    const users = await getCollection<any>('users');
    const user = await users.findOne({ id: decoded.id }, { projection: { password: 0 } });
    if (!user) { 
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
