import React, { useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { rideHistory } from "../data/rideHistory";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RideHistoryScreen: React.FC = () => {
  const [filter, setFilter] = useState<"All" | "Today" | "Yesterday">("All");
  const stats = useMemo(() => {
    const totalDistance = rideHistory.reduce((sum, ride) => sum + ride.distanceKm, 0);
    const totalMinutes = rideHistory.reduce((sum, ride) => sum + ride.durationMinutes, 0);
    return { totalDistance: totalDistance.toFixed(1), totalMinutes };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return rideHistory;
    return rideHistory.filter((ride) => ride.date === filter);
  }, [filter]);

  const filters: ("All" | "Today" | "Yesterday")[] = ["All", "Today", "Yesterday"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride history</Text>
      <Text style={styles.subtitle}>Track your campus mobility streaks and eco contributions.</Text>

      <View style={styles.metricsRow}>
        <View style={[styles.metric, { marginRight: 12 }]}>
          <Text style={styles.metricValue}>{stats.totalDistance} km</Text>
          <Text style={styles.metricLabel}>Distance</Text>
        </View>
        <View style={[styles.metric, { marginRight: 0 }]}>
          <Text style={styles.metricValue}>{stats.totalMinutes} min</Text>
          <Text style={styles.metricLabel}>On saddle</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {filters.map((chip) => (
          <TouchableOpacity
            key={chip}
            onPress={() => setFilter(chip)}
            style={[styles.chip, filter === chip && styles.activeChip]}
          >
            <Text style={[styles.chipText, filter === chip && styles.activeChipText]}>{chip}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(r) => r.id}
        contentContainerStyle={{ paddingBottom: 32 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.route}>{item.from} → {item.to}</Text>
                <Text style={styles.meta}>{item.date} • {item.time}</Text>
              </View>
              <View style={styles.amountTag}>
                <MaterialCommunityIcons name="currency-inr" size={14} color="#0b0b0b" />
                <Text style={styles.amountText}>{item.amount.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailPill}>
                <MaterialCommunityIcons name="timer-outline" size={16} color="#9decc6" />
                <Text style={styles.detailText}>{item.durationMinutes} mins</Text>
              </View>
              <View style={styles.detailPill}>
                <MaterialCommunityIcons name="map-marker-distance" size={16} color="#9decc6" />
                <Text style={styles.detailText}>{item.distanceKm} km</Text>
              </View>
              <View style={styles.detailPill}>
                <MaterialCommunityIcons name="bike" size={16} color="#9decc6" />
                <Text style={styles.detailText}>{item.bikeType}</Text>
              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', paddingHorizontal: 20, paddingTop: 24 },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#b5b5b5', marginTop: 6, marginBottom: 16, lineHeight: 20 },
  metricsRow: { flexDirection: 'row', marginBottom: 14 },
  metric: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  metricValue: { color: '#fff', fontSize: 18, fontWeight: '700' },
  metricLabel: { color: '#9c9c9c', marginTop: 4, fontSize: 12 },
  filterRow: { flexDirection: 'row', marginBottom: 16 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 8,
  },
  chipText: { color: '#9da5a0', fontWeight: '600', fontSize: 12 },
  activeChip: { backgroundColor: '#00d084', borderColor: '#00d084' },
  activeChipText: { color: '#0b0b0b' },
  card: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  route: { color: '#fff', fontSize: 16, fontWeight: '600' },
  meta: { color: '#9a9a9a', marginTop: 4, fontSize: 12 },
  amountTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00d084',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  amountText: { color: '#0b0b0b', fontWeight: '700', fontSize: 12 },
  detailRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  detailPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(0,208,132,0.08)',
  },
  detailText: { color: '#d0f6e5', fontSize: 12 },
});

export default RideHistoryScreen;
