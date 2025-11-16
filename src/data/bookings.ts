import { Booking } from "../types/booking";

export const bookings: Booking[] = [
  { 
    id: "1", 
    bikeId: "P001", 
    type: "Pedal", 
    station: "Library Parking", 
    bookingTime: "Tomorrow 9:00 AM", 
    priceEstimate: 15, 
    status: "confirmed" 
  },
  { 
    id: "2", 
    bikeId: "P002", 
    type: "Pedal", 
    station: "Cafeteria Stand", 
    bookingTime: "Dec 25 at 2:30 PM", 
    priceEstimate: 8, 
    status: "confirmed" 
  }
];
