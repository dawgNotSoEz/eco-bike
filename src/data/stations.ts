import { Station } from "../types/station";

export const stations: Station[] = [
  {
    id: 1,
    title: "A-Block",
    subtitle: "Near Central Library",
    distance: 120,
    availablePedal: 5,
    location: { latitude: 28.483500, longitude: 76.907000 }
  },
  {
    id: 2,
    title: "E-Block",
    subtitle: "Building A Entrance",
    distance: 250,
    availablePedal: 4,
    location: { latitude: 28.484000, longitude: 76.907500 }
  },
  {
    id: 3,
    title: "C-Block",
    subtitle: "Main Cafeteria",
    distance: 180,
    availablePedal: 6,
    location: { latitude: 28.483200, longitude: 76.906800 }
  },
  {
    id: 4,
    title: "D-Block",
    subtitle: "Gymnasium Entrance",
    distance: 320,
    availablePedal: 3,
    location: { latitude: 28.484200, longitude: 76.907200 }
  },
  {
    id: 5,
    title: "Shopping Complex",
    subtitle: "Residential Area",
    distance: 400,
    availablePedal: 4,
    location: { latitude: 28.482800, longitude: 76.906500 }
  }
];
