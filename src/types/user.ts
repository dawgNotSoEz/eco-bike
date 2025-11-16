export interface User {
  id: string;
  name: string;
  studentId: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  campus: string;
  ridesToday: number;
  totalRides: number;
  isPremium: boolean;
  isVerified: boolean;
  profilePicture?: string;
}
