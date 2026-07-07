import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { getCollection } from '../config/db';
import { comparePassword, hashPassword, signToken } from '../utils/auth';
import { AuthenticatedRequest } from '../middleware/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const users = await getCollection<any>('users');
    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);
    const user = {
      id: randomUUID(),
      name,
      email,
      password: hashedPassword,
      role: role || 'CANDIDATE',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await users.insertOne(user);
    const token = signToken({ id: user.id, role: user.role });
    return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Entered in login");
    const users = await getCollection<any>('users');
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = signToken({ id: user.id, role: user.role });
    return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to login' });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({ user: req.user });
};
