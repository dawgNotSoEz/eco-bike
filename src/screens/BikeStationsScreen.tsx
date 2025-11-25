import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { stations as mockStations } from "../data/stations";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const BikeStationsScreen: React.FC = () => {
  const totals = useMemo(() => {
    const totalBikes = mockStations.reduce((sum, station) => sum + station.availablePedal, 0);
    const nearest = [...mockStations].sort((a, b) => a.distance - b.distance)[0];
    return { totalBikes, nearestName: nearest?.title ?? "—", nearestDistance: nearest?.distance ?? 0 };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={mockStations}
        keyExtractor={(s) => s.id.toString()}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListHeaderComponent={(
          <>
            <LinearGradient colors={["#101010", "#050505"]} style={styles.heroCard}>
              <View>
                <Text style={styles.heroTitle}>Campus Stations</Text>
                <Text style={styles.heroSubtitle}>Monitor availability and walkable distance before you reserve.</Text>
              </View>
              <View style={styles.heroBadge}>
                <MaterialCommunityIcons name="bike" size={14} color="#00d084" />
                <Text style={styles.heroBadgeText}>Live feed</Text>
              </View>
            </LinearGradient>

            <View style={styles.metricsRow}>
              <View style={[styles.metric, { marginRight: 10 }]}>
                <Text style={styles.metricValue}>{mockStations.length}</Text>
                <Text style={styles.metricLabel}>Active stations</Text>
              </View>
              <View style={[styles.metric, { marginRight: 10 }]}>
                <Text style={styles.metricValue}>{totals.totalBikes}</Text>
                <Text style={styles.metricLabel}>Pedal bikes</Text>
              </View>
              <View style={[styles.metric, { marginRight: 0 }]}>
                <Text style={styles.metricValue}>{totals.nearestDistance} m</Text>
                <Text style={styles.metricLabel}>Nearest ({totals.nearestName})</Text>
              </View>
            </View>

            <Text style={styles.title}>Stations overview</Text>
          </>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.sub}>{item.subtitle}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaPill}>
                  <MaterialCommunityIcons name="bike-fast" size={14} color="#0b0b0b" />
                  <Text style={styles.metaPillText}>{item.availablePedal} pedal</Text>
                </View>
                <View style={styles.metaPill}>
                  <MaterialCommunityIcons name="map-marker-distance" size={14} color="#0b0b0b" />
                  <Text style={styles.metaPillText}>{item.distance} m</Text>
                </View>
              </View>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color="#777" />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', paddingHorizontal: 20, paddingTop: 20 },
  heroCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 6 },
  heroSubtitle: { color: '#b5b5b5', fontSize: 14, lineHeight: 20 },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(0,208,132,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 12,
    gap: 6,
  },
  heroBadgeText: { color: '#00d084', fontWeight: '600', fontSize: 12 },
  metricsRow: { flexDirection: 'row', marginBottom: 16 },
  metric: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    backgroundColor: '#0f0f0f',
    padding: 16,
    marginRight: 10,
  },
  metricValue: { color: '#fff', fontSize: 18, fontWeight: '700' },
  metricLabel: { color: '#a5a5a5', fontSize: 12, marginTop: 4 },
  title: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  card: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sub: { color: '#9a9a9a', marginTop: 4 },
  metaRow: { flexDirection: 'row', marginTop: 12 },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00d084',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    gap: 6,
  },
  metaPillText: { color: '#0b0b0b', fontWeight: '700', fontSize: 12 },
});

export default BikeStationsScreen;
