export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'CANDIDATE';
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  employmentType: string;
  salary?: string;
  createdBy?: number;
  createdAt?: string;
}

export interface Application {
  id: number;
  candidateId: number;
  jobId: number;
  title?: string;
  company?: string;
  candidate_name?: string;
  resumeLink?: string;
  coverLetter?: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}
