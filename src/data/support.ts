import { SupportTicket, FAQ, IssueType } from '../types/support';

export const supportTickets: SupportTicket[] = [
  {
    id: "1",
    title: "Bike not unlocking",
    ticketNumber: "TKT-001",
    status: "resolved",
    createdAt: "2025-09-17",
    daysAgo: 2
  },
  {
    id: "2", 
    title: "Incorrect billing",
    ticketNumber: "TKT-002",
    status: "pending",
    createdAt: "2025-09-14",
    daysAgo: 5
  }
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I unlock a bike?",
    answer: "Scan the QR code on the bike using the app and follow the instructions.",
    tag: "popular"
  },
  {
    id: "2",
    question: "What if I face technical issues during ride?",
    answer: "Contact support immediately through the app or call our helpline.",
    tag: "urgent"
  },
  {
    id: "3",
    question: "How can I become premium member?",
    answer: "Visit the wallet section and select premium membership options.",
    tag: "new"
  }
];

export const issueTypes: IssueType[] = [
  {
    id: "1",
    type: "Mechanical Issue",
    color: "#e53935",
    icon: "wrench"
  },
  {
    id: "2",
    type: "Physical Damage",
    color: "#ec407a", 
    icon: "shield-alert"
  },
  {
    id: "3",
    type: "App/System Bug",
    color: "#7e57c2",
    icon: "bug"
  }
];