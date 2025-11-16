export interface Booking {
  id: string;
  bikeId: string;
  type: "Pedal";
  station: string;
  bookingTime: string;
  priceEstimate: number;
  status: "confirmed" | "cancelled";
}
