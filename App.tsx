import React from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerRootComponent } from "expo";
import AppNavigator from "./src/navigation/AppNavigator";
import { ErrorBoundary } from "./src/components/ErrorBoundary";

const App = () => {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <StatusBar style="light" backgroundColor="#0f0f0f" />
        <AppNavigator />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default App;

registerRootComponent(App);
