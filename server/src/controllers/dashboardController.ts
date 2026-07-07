import { Response } from 'express';
import { getCollection } from '../config/db';
import { AuthenticatedRequest } from '../middleware/auth';

export const getAdminDashboard = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await getCollection<any>('users');
    const jobs = await getCollection<any>('jobs');
    const applications = await getCollection<any>('applications');

    const [userCount, jobCount, applicationCount, offerCount, interviewCount, recentJobs, recentCandidates] = await Promise.all([
      users.countDocuments(),
      jobs.countDocuments(),
      applications.countDocuments(),
      applications.countDocuments({ status: 'Offer' }),
      applications.countDocuments({ status: 'Interview' }),
      jobs.find({}).sort({ createdAt: -1 }).limit(5).toArray(),
      users.find({ role: 'CANDIDATE' }).sort({ createdAt: -1 }).limit(5).project({ password: 0 }).toArray(),
    ]);

    return res.json({
      totals: {
        users: userCount,
        jobs: jobCount,
        applications: applicationCount,
        offers: offerCount,
        interviews: interviewCount,
      },
      recentJobs,
      recentCandidates,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load admin dashboard' });
  }
};

export const getCandidateDashboard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const applications = await getCollection<any>('applications');
    const [total, applied, interview, offer, rejected] = await Promise.all([
      applications.countDocuments({ candidateId: req.user!.id }),
      applications.countDocuments({ candidateId: req.user!.id, status: 'Applied' }),
      applications.countDocuments({ candidateId: req.user!.id, status: 'Interview' }),
      applications.countDocuments({ candidateId: req.user!.id, status: 'Offer' }),
      applications.countDocuments({ candidateId: req.user!.id, status: 'Rejected' }),
    ]);

    return res.json({ stats: { total, applied, interview, offer, rejected } });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load candidate dashboard' });
  }
};