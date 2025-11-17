import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from "./BottomTabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletScreen from "../screens/WalletScreen";
import QRScannerScreen from "../screens/QRScannerScreen";
import EmergencySOS from "../screens/EmergencySOS";
import BookingScreen from "../screens/BookingScreen";
import BikeStationsScreen from "../screens/BikeStationsScreen";
import RideHistoryScreen from "../screens/RideHistoryScreen";
import SelectBikeScreen from "../screens/SelectBikeScreen";
import ShuttleScheduleScreen from "../screens/ShuttleScheduleScreen";
import EcoPointsScreen from "../screens/EcoPointsScreen";
import HelpSupportScreen from "../screens/HelpSupportScreen";
import ReportIssueScreen from "../screens/ReportIssueScreen";
import ContactSupportScreen from "../screens/ContactSupportScreen";
import StationDetails from "../screens/StationDetails";
import PaymentGatewayScreen from "../screens/PaymentGatewayScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { AuthProvider, AuthContext } from "../context/AuthContext";

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  Wallet: undefined;
  QRScanner: undefined;
  EmergencySOS: undefined;
  Bookings: undefined;
  BikeStations: undefined;
  RideHistory: undefined;
  SelectBike: undefined;
  ShuttleSchedule: undefined;
  EcoPoints: undefined;
  HelpSupport: undefined;
  ReportIssue: undefined;
  ContactSupport: undefined;
  StationDetails: { stationId: number } | undefined;
  PaymentGateway: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <AuthProvider>
      <InnerNavigator />
    </AuthProvider>
  );
};

const InnerNavigator: React.FC = () => {
  const { loading, onboardingComplete, user } = useContext(AuthContext);

  // Decide initial route based on auth state
  let initialRoute: keyof RootStackParamList = 'Main';
  if (!onboardingComplete) initialRoute = 'Onboarding';
  else if (!user) initialRoute = 'SignIn';

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        {/* Auth/onboarding */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Main app */}
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} />
        <Stack.Screen name="EmergencySOS" component={EmergencySOS} />
        <Stack.Screen name="Bookings" component={BookingScreen} />
        <Stack.Screen name="BikeStations" component={BikeStationsScreen} />
        <Stack.Screen name="RideHistory" component={RideHistoryScreen} />
        <Stack.Screen name="SelectBike" component={SelectBikeScreen} />
        <Stack.Screen name="ShuttleSchedule" component={ShuttleScheduleScreen} />
        <Stack.Screen name="EcoPoints" component={EcoPointsScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
        <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
        <Stack.Screen name="StationDetails" component={StationDetails} />
        <Stack.Screen name="PaymentGateway" component={PaymentGatewayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;

