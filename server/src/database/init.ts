import { randomUUID } from 'crypto';
import { getCollection } from '../config/db';
import { hashPassword } from '../utils/auth';

type UserDoc = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export const initializeDatabase = async () => {
  const users = await getCollection<UserDoc>('users');
  await users.createIndex({ email: 1 }, { unique: true });

  const jobs = await getCollection('jobs');
  await jobs.createIndex({ title: 1, company: 1 });

  const applications = await getCollection('applications');
  await applications.createIndex({ candidateId: 1, jobId: 1 });

  const existingAdmin = await users.findOne({ email: 'admin@jobtracker.com' });
  if (!existingAdmin) {
    await users.insertOne({
      id: randomUUID(),
      name: 'Admin User',
      email: 'admin@jobtracker.com',
      password: await hashPassword('admin123'),
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};
