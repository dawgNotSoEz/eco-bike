import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EcoStats } from "../types/eco";

interface Props {
  eco: EcoStats;
  onViewAll?: () => void;
}

export const EcoImpactCard: React.FC<Props> = ({ eco, onViewAll }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{eco.ecoPoints} Eco Points</Text>
        <TouchableOpacity style={styles.viewAll} onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{eco.co2Saved} kg</Text>
          <Text style={styles.metricLabel}>CO₂ Saved</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{eco.greenRides}</Text>
          <Text style={styles.metricLabel}>Green Rides</Text>
        </View>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{eco.level} {eco.rank}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#062c1b",
    borderRadius: 14,
    padding: 14,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#00d084',
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#00ff77",
    fontSize: 18,
    fontWeight: "700",
  },
  viewAll: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewAllText: {
    color: "#fff",
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  metric: {
    flex: 1,
    alignItems: "center",
  },
  metricValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  metricLabel: {
    color: "#cfcfcf",
    fontSize: 12,
  },
  badge: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default EcoImpactCard;
