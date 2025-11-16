export interface SupportTicket {
  id: string;
  title: string;
  ticketNumber: string;
  status: "resolved" | "pending" | "open";
  createdAt: string;
  daysAgo: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  tag: "popular" | "urgent" | "new";
}

export interface IssueType {
  id: string;
  type: string;
  color: string;
  icon: string;
}