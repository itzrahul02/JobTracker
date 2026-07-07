import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => bcrypt.hash(password, 10);
export const comparePassword = async (password: string, hashed: string) => bcrypt.compare(password, hashed);

export const signToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'supersecretjwtkey', { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey');
};
