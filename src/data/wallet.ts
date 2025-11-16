import { Wallet, Transaction, PaymentMethod } from "../types/wallet";

export const wallet: Wallet = {
  balance: 245.50,
  isPremium: true,
  autoRechargeEnabled: true,
  transactions: [
    {
      id: "t1",
      type: "ride",
      description: "Campus Ride (Library to Engineering)",
      amount: -12.50,
      date: "Today",
      time: "2:30 PM"
    },
    {
      id: "t2",
      type: "cashback",
  description: "Eco-Ride Bonus Cashback",
      amount: 5.00,
      date: "Today",
      time: "2:45 PM"
    },
    {
      id: "t3",
      type: "topup",
      description: "Wallet Top-up via UPI",
      amount: 200.00,
      date: "Yesterday",
      time: "6:00 PM"
    },
    {
      id: "t4",
      type: "ride",
      description: "Campus Ride (Cafeteria to Hostel)",
      amount: -8.75,
      date: "Yesterday",
      time: "8:30 AM"
    }
  ],
  savedMethods: [
    {
      id: "pm1",
      type: "upi",
      display: "john.doe@paytm",
      isPrimary: true
    },
    {
      id: "pm2",
      type: "card",
      display: "****4532",
      isPrimary: false
    }
  ]
};
