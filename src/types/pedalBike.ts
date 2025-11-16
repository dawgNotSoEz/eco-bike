export interface PedalBike {
  id: string;
  code: string; // e.g., "P001", "P002"
  status: "available" | "rented" | "maintenance";
  location: string;
  pricePerMin: number;
  distance: number;
  battery?: never; // Ensures no electric bikes
}
