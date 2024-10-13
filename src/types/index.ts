export interface Case {
  id: string;
  title: string;
  date: string;
  status: 'Open' | 'In Progress' | 'Closed';
  description: string;
}

export interface CaseDetails extends Case {
  documents: string[];
  videos: string[];
  chainOfCustody: ChainOfCustodyEntry[];
}

export interface ChainOfCustodyEntry {
  action: string;
  user: string;
  timestamp: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Staff';
  firstName: string;
  lastName: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'Manager' | 'Staff';
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
