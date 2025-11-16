import { ShuttleRoute } from '../types/shuttle';

export const shuttleRoutes: ShuttleRoute[] = [
  {
    routeName: "SGT Campus Loop",
    color: "#2196f3",
    stops: [
      { stopName: "Main Gate", time: "12:05", status: "Arriving" },
      { stopName: "Library", time: "12:08", status: "On Time" },
      { stopName: "Engineering", time: "12:12", status: "Delayed", delayMinutes: 3 },
      { stopName: "Campus Center", time: "12:15", status: "On Time" }
    ]
  },
  {
    routeName: "SGT Express",
    color: "#4caf50",
    stops: [
      { stopName: "Medical Center", time: "12:20", status: "On Time" },
      { stopName: "Sports Complex", time: "12:25", status: "On Time" },
      { stopName: "Hostel Area", time: "12:30", status: "On Time" }
    ]
  },
  {
    routeName: "SGT Parking Shuttles",
    color: "#e91e63",
    stops: [
      { stopName: "Parking Lot A", time: "12:03", status: "Arriving" },
      { stopName: "Parking Lot B", time: "12:07", status: "On Time" },
      { stopName: "Parking Lot C", time: "12:11", status: "On Time" }
    ]
  }
];