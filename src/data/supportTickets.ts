import { SupportTicket } from "../types/supportTicket";

export const mockSupportTickets: SupportTicket[] = [
  { id: 't1', title: 'Bike not unlocking', status: 'open', createdAt: '2025-09-10' },
  { id: 't2', title: 'Incorrect billing', status: 'pending', createdAt: '2025-09-11' },
  { id: 't3', title: 'App crash on scan', status: 'resolved', createdAt: '2025-09-05' },
];
