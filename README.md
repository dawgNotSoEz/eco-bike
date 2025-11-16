# Fleet Bikes (Expo)

This is a high-fidelity React Native (Expo) skeleton for the Fleet Bikes app for SGT University.

Structure:
- src/components - UI components
- src/screens - screens
- src/navigation - navigation setup
- src/types - TypeScript interfaces
- src/data - mock data

How to run (local):

1. Install dependencies

   npm install

2. Start Expo

   npm start

Notes:
- This project expects Expo SDK ~48 and TypeScript strict mode.
- Some native modules (react-native-maps) require platform setup on device/simulator.
- Navigation types are intentionally relaxed in places for speed; you can add strongly-typed navigators later.

What I implemented:
- All components and screens described in the prompt, with TypeScript types and mock data.
- Bottom tabs navigation and stack navigator.
- Quick Access modal and FAB.

Next steps (optional):
- Add StationDetails and other placeholder screens.
- Integrate map markers from stations data.
- Add unit tests and automated type checks.
