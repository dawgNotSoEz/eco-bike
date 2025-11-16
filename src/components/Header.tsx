import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface HeaderProps {
  campus: string;
}

export const Header: React.FC<HeaderProps> = ({ campus }) => {
  return (
    <LinearGradient colors={["#4e00c2", "#0076ff"]} style={styles.container}>
      <View style={styles.left}>
        <Image source={require("../../assets/images/Logo.png")} style={styles.logo} />
      </View>

      <View style={styles.center}>
  <Text style={styles.title}>EcoCycle Campus</Text>
  <Text style={styles.subtitle}>SGT University - Smart Mobility Hub</Text>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.campusPill}>
          <Text style={styles.campusText}>{campus}</Text>
          <Ionicons name="chevron-down" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    paddingTop: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    width: 40,
    alignItems: "flex-start",
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain'
  },
  bikeIcon: {
    backgroundColor: "rgba(255,255,255,0.12)",
    padding: 8,
    borderRadius: 12,
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: "#d1d1d1",
    fontSize: 12,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  campusPill: {
    backgroundColor: "rgba(0,0,0,0.18)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  campusText: {
    color: "#00d084",
    marginRight: 6,
    fontWeight: "600",
  },
  searchBtn: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 8,
    borderRadius: 10,
  },
});

export default Header;
