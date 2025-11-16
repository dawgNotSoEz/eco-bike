import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import WalletScreen from "../screens/WalletScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: "rgba(15,15,15,0.95)", borderTopWidth: 0 },
      tabBarActiveTintColor: "#00ff77",
      tabBarInactiveTintColor: "#aaa",
  tabBarIcon: ({ color, size: _size }) => {
        let name: any = "home";
        if (route.name === "Home") name = "home";
        if (route.name === "Map") name = "map";
        if (route.name === "Wallet") name = "wallet";
        if (route.name === "Profile") name = "person";
        return <Ionicons name={name} size={20} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
