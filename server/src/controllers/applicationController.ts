import { randomUUID } from 'crypto';
import { Response } from 'express';
import { getCollection } from '../config/db';
import { AuthenticatedRequest } from '../middleware/auth';

export const getApplications = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const applications = await getCollection<any>('applications');
    const jobs = await getCollection<any>('jobs');
    const users = await getCollection<any>('users');
    const queryFilter = req.user?.role === 'ADMIN' ? {} : { candidateId: req.user!.id };
    const result = await applications.find(queryFilter).sort({ createdAt: -1 }).toArray();
    const populated = await Promise.all(result.map(async (app: any) => {
      const job = await jobs.findOne({ id: app.jobId });
      const candidate = await users.findOne({ id: app.candidateId });
      return { ...app, title: job?.title, company: job?.company, candidate_name: candidate?.name };
    }));
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

export const getApplicationById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const applications = await getCollection<any>('applications');
    const app = await applications.findOne({ id: req.params.id });
    if (!app) return res.status(404).json({ message: 'Application not found' });
    if (req.user?.role !== 'ADMIN' && app.candidateId !== req.user?.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const jobs = await getCollection<any>('jobs');
    const users = await getCollection<any>('users');
    const job = await jobs.findOne({ id: app.jobId });
    const candidate = await users.findOne({ id: app.candidateId });
    return res.json({ ...app, title: job?.title, company: job?.company, candidate_name: candidate?.name });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch application' });
  }
};

export const createApplication = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { jobId } = req.body;
    const applications = await getCollection<any>('applications');
    const existing = await applications.findOne({ candidateId: req.user!.id, jobId });
    if (existing) return res.status(400).json({ message: 'Application already exists' });
    const users = await getCollection<any>('users')
    const user = await users.findOne({id:req.user?.id})
    console.log("resume link",user);
    const app = {
      id: randomUUID(),
      candidateId: req.user!.id,
      jobId,
      resumeLink:user.resumeLink,
      
      status: 'Applied',
      adminNotes: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await applications.insertOne(app);
    return res.status(201).json(app);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create application' });
  }
};

export const updateApplication = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status, adminNotes } = req.body;
    const applications = await getCollection<any>('applications');
    const app = await applications.findOne({ id: req.params.id });
    if (!app) return res.status(404).json({ message: 'Application not found' });
    if (req.user?.role !== 'ADMIN' && app.candidateId !== req.user?.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const update: Record<string, unknown> = { updatedAt: new Date() };
    if (status) update.status = status;
    if (adminNotes !== undefined) update.adminNotes = adminNotes;
    if (Object.keys(update).length === 1) return res.status(400).json({ message: 'No changes provided' });
    const updated = await applications.findOneAndUpdate({ id: req.params.id }, { $set: update }, { returnDocument: 'after' });
    return res.json(updated.value);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update application' });
  }
};

export const deleteApplication = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const applications = await getCollection<any>('applications');
    const result = await applications.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Application not found' });
    return res.json({ message: 'Application deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete application' });
  }
};
