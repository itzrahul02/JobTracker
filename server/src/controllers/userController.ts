import { Response } from 'express';
import { getCollection } from '../config/db';
import { AuthenticatedRequest } from '../middleware/auth';
import { hashPassword } from '../utils/auth';

export const getUsers = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await getCollection<any>('users');
    const result = await users.find({}, { projection: { password: 0 } }).sort({ createdAt: -1 }).toArray();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await getCollection<any>('users');
    const user = await users.findOne({ id: req.params.id }, { projection: { password: 0 } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch user' });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, email, password,resumeLink } = req.body;
    const users = await getCollection<any>('users');
    const update: Record<string, unknown> = { updatedAt: new Date() };
    if (name) update.name = name;
    if (email) update.email = email;
    if (password) update.password = await hashPassword(password);
    if (resumeLink) update.resumeLink = resumeLink
    if (Object.keys(update).length === 1) return res.status(400).json({ message: 'No changes provided' });
    const result = await users.findOneAndUpdate({ id: req.user!.id }, { $set: update }, { returnDocument: 'after', projection: { password: 0 } });
    return res.json(result.value);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update profile' });
  }
};