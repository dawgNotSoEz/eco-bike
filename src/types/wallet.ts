export interface Wallet {
  balance: number;
  isPremium: boolean;
  autoRechargeEnabled: boolean;
  transactions: Transaction[];
  savedMethods: PaymentMethod[];
}

export interface Transaction {
  id: string;
  type: "ride" | "topup" | "cashback";
  description: string;
  amount: number;
  date: string;
  time: string;
}

export interface PaymentMethod {
  id: string;
  type: "upi" | "card" | "netbanking";
  display: string;
  isPrimary: boolean;
}
