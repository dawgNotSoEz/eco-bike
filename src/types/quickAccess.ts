export interface QuickTool {
  id: number;
  title: string;
  color: string;
  icon: string;
  category: "scanner" | "emergency" | "booking" | "tool";
}
