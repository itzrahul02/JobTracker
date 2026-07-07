import { randomUUID } from 'crypto';
import { Response } from 'express';
import { getCollection } from '../config/db';
import { AuthenticatedRequest } from '../middleware/auth';

export const getJobs = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const jobs = await getCollection<any>('jobs');
    const result = await jobs.find({}).sort({ createdAt: -1 }).toArray();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

export const getJobById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const jobs = await getCollection<any>('jobs');
    const job = await jobs.findOne({ id: req.params.id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    return res.json(job);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch job' });
  }
};

export const createJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, company, location, description, employmentType, salary } = req.body;
    const jobs = await getCollection<any>('jobs');
    const job = {
      id: randomUUID(),
      title,
      company,
      location,
      description,
      employmentType,
      salary,
      createdBy: req.user!.id,
      createdAt: new Date(),
    };
    await jobs.insertOne(job);
    return res.status(201).json(job);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create job' });
  }
};

export const updateJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, company, location, description, employmentType, salary } = req.body;
    const jobs = await getCollection<any>('jobs');
    const update: Record<string, unknown> = {};
    if (title) update.title = title;
    if (company) update.company = company;
    if (location) update.location = location;
    if (description) update.description = description;
    if (employmentType) update.employmentType = employmentType;
    if (salary) update.salary = salary;
    if (Object.keys(update).length === 0) return res.status(400).json({ message: 'No changes provided' });
    const result = await jobs.findOneAndUpdate({ id: req.params.id }, { $set: update }, { returnDocument: 'after' });
    if (!result.value) return res.status(404).json({ message: 'Job not found' });
    return res.json(result.value);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update job' });
  }
};

export const deleteJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const jobs = await getCollection<any>('jobs');
    const applications = await getCollection<any>('applications')
    await applications.deleteMany({jobId:req.params.id})
    const result = await jobs.deleteOne({ id: req.params.id });
    
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Job not found' });
    return res.json({ message: 'Job deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete job' });
  }
};