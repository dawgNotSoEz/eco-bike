export interface ShuttleRoute {
  routeName: string;
  color: string;
  stops: ShuttleStop[];
}

export interface ShuttleStop {
  stopName: string;
  time: string;
  status: "Arriving" | "On Time" | "Delayed";
  delayMinutes?: number;
}
