import React from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerRootComponent } from "expo";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#0f0f0f" />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;

registerRootComponent(App);
