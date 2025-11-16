import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  onPress?: () => void;
}

export const BookingCard: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Book in Advance</Text>
      <Text style={styles.subtitle}>Reserve your preferred pedal bike for later rides.</Text>

      <View style={styles.optionsRow}>
        <View style={styles.option}>
          <Text style={styles.optionIcon}>🚲</Text>
          <Text style={styles.optionLabel}>Pedal Available</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cta} onPress={onPress}>
        <Text style={styles.ctaText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ff7a00",
    borderRadius: 14,
    padding: 14,
    marginVertical: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6,
  },
  optionsRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  optionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  optionLabel: {
    color: "#fff",
    fontSize: 12,
  },
  cta: {
    marginTop: 12,
    backgroundColor: '#ff5722',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700'
  }
});

export default BookingCard;
