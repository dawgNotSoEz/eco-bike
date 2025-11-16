import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  ridesToday: number;
  onPress?: () => void;
}

export const RidesCard: React.FC<Props> = ({ ridesToday, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="bike" size={28} color="#fff" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.count}>{ridesToday}</Text>
          <Text style={styles.label}>Today&apos;s Rides</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 16,
    backgroundColor: "#4e00c2",
    marginLeft: 8,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  label: {
    color: "#d1d1d1",
    fontSize: 12,
  },
});

export default RidesCard;
