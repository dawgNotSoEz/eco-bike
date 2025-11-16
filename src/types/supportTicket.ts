export interface SupportTicket {
  id: string;
  title: string;
  status: "resolved" | "pending" | "open";
  createdAt: string;
}
