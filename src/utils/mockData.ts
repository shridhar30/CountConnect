import { Company, Student, Job, Application } from '../types';

export const mockCompanies: Company[] = [
  {
    id: '1',
    email: 'hr@techcorp.com',
    name: 'Raj Sharma',
    type: 'company',
    companyName: 'TechCorp Industries',
    industry: 'Manufacturing',
    address: 'Mumbai, Maharashtra',
    phone: '+91 98765 43210',
    isVerified: true,
    verificationStatus: 'verified',
    verificationId: 'TC2024001',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'audit@financeplus.com',
    name: 'Priya Patel',
    type: 'company',
    companyName: 'FinancePlus Auditors',
    industry: 'Finance & Audit',
    address: 'Delhi, NCR',
    phone: '+91 87654 32109',
    isVerified: true,
    verificationStatus: 'verified',
    verificationId: 'FP2024002',
    createdAt: new Date('2024-01-20')
  }
];

export const mockStudents: Student[] = [
  {
    id: '3',
    email: 'anil.kumar@student.com',
    name: 'Anil Kumar',
    type: 'student',
    university: 'Delhi University',
    year: 3,
    skills: ['Excel', 'Data Entry', 'Inventory Management'],
    experience: 'Completed 2 stock counts last year',
    phone: '+91 76543 21098',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '4',
    email: 'sneha.singh@student.com',
    name: 'Sneha Singh',
    type: 'student',
    university: 'Mumbai University',
    year: 2,
    skills: ['MS Office', 'Accounting', 'Team Work'],
    experience: 'New to stock counting, eager to learn',
    phone: '+91 65432 10987',
    createdAt: new Date('2024-02-05')
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    companyId: '1',
    company: mockCompanies[0],
    title: 'Warehouse Stock Count Assistant',
    description: 'We need reliable students to assist with our annual inventory count. Training will be provided.',
    location: 'Gurgaon, Haryana',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-20'),
    duration: '6 days',
    payRate: 1500,
    requirements: ['Basic Excel knowledge', 'Attention to detail', 'Available full-time for 6 days'],
    status: 'open',
    applicants: ['3', '4'],
    selectedStudents: [],
    createdAt: new Date('2024-02-10')
  },
  {
    id: '2',
    companyId: '2',
    company: mockCompanies[1],
    title: 'Retail Store Inventory Count',
    description: 'Assist with stock counting across multiple retail locations. Great opportunity for commerce students.',
    location: 'South Delhi',
    startDate: new Date('2024-03-22'),
    endDate: new Date('2024-03-25'),
    duration: '4 days',
    payRate: 1200,
    requirements: ['Commerce background preferred', 'Mobile phone for data entry', 'Team player'],
    status: 'open',
    applicants: ['3'],
    selectedStudents: [],
    createdAt: new Date('2024-02-12')
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    studentId: '3',
    status: 'pending',
    appliedAt: new Date('2024-02-11'),
    message: 'I have experience in stock counting and am available for all 6 days.'
  },
  {
    id: '2',
    jobId: '1',
    studentId: '4',
    status: 'pending',
    appliedAt: new Date('2024-02-12'),
    message: 'This would be my first stock count job, but I am very dedicated and detail-oriented.'
  }
];