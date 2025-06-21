export interface User {
  id: string;
  email: string;
  name: string;
  type: 'student' | 'company';
  phone?: string;
  isVerified?: boolean;
  verificationId?: string;
  createdAt: Date;
}

export interface Company extends User {
  type: 'company';
  companyName: string;
  industry: string;
  address: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationId: string;
}

export interface Student extends User {
  type: 'student';
  university: string;
  year: number;
  skills: string[];
  experience: string;
}

export interface Job {
  id: string;
  companyId: string;
  company: Company;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  payRate: number;
  requirements: string[];
  status: 'open' | 'closed' | 'completed';
  applicants: string[];
  selectedStudents: string[];
  createdAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: Date;
  message?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  jobId?: string;
  content: string;
  timestamp: Date;
  read: boolean;
}