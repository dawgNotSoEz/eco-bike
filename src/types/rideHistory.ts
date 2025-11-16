export interface RideHistory {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  durationMinutes: number;
  distanceKm: number;
  amount: number;
  bikeType: "Pedal";
}
