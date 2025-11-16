import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { rideHistory } from "../data/rideHistory";

const RideHistoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride History</Text>
      <FlatList
        data={rideHistory}
        keyExtractor={(r) => r.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.route}>{item.from} → {item.to}</Text>
            <Text style={styles.meta}>{item.date} • {item.durationMinutes} mins • {item.distanceKm} km • ₹{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 16 },
  title: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: '#1a1a1a', padding: 12, borderRadius: 12, marginBottom: 12 },
  route: { color: '#fff', fontSize: 16 },
  meta: { color: '#bbb', marginTop: 4 },
});

export default RideHistoryScreen;
