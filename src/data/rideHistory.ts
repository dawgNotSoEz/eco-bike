import { RideHistory } from "../types/rideHistory";

export const rideHistory: RideHistory[] = [
  { 
    id: "1", 
    from: "A-Block", 
    to: "E-Block", 
    date: "Today", 
    time: "2:30 PM", 
    durationMinutes: 15, 
    distanceKm: 2.3, 
    amount: 12.5, 
    bikeType: "Pedal" 
  },
  { 
    id: "2", 
    from: "Shopping Complex", 
    to: "C-Block", 
    date: "Today", 
    time: "9:15 AM", 
    durationMinutes: 22, 
    distanceKm: 3.1, 
    amount: 18.75, 
    bikeType: "Pedal" 
  },
  { 
    id: "3", 
    from: "D-Block", 
    to: "A-Block", 
    date: "Yesterday", 
    time: "6:45 PM", 
    durationMinutes: 8, 
    distanceKm: 1.2, 
    amount: 8, 
    bikeType: "Pedal" 
  }
];
