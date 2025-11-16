// Station shape required by FLEET.prompt.md (SGT University - Pedal bikes only)
// Matches: id, title, subtitle, distance (meters), availablePedal, location
export interface Station {
  id: number;
  title: string;
  subtitle: string;
  // distance in meters from user's current location (approx)
  distance: number;
  // number of pedal bikes available at the station
  availablePedal: number;
  location: {
    latitude: number;
    longitude: number;
  };
}
