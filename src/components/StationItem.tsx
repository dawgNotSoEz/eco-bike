import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Station } from "../types/station";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  station: Station;
  onPress?: () => void;
}

export const StationItem: React.FC<Props> = ({ station, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{station.title}</Text>
        <Text style={styles.subtitle}>{station.subtitle} • {station.distance}m</Text>
      </View>

      <View style={styles.avail}>
        {station.availablePedal !== undefined && (
          <View style={styles.countRow}>
            <MaterialCommunityIcons name="bike" size={16} color="#fff" />
            <Text style={styles.countText}>{station.availablePedal}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#151515",
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#00d084'
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  subtitle: {
    color: "#aaaaaa",
    fontSize: 12,
  },
  avail: {
    marginLeft: 12,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  countRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  countText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "700",
  },
});

export default StationItem;
