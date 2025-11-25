import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Linking } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { bikes } from "../data/bikes";
import { LinearGradient } from "expo-linear-gradient";

export const MapScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"available" | "campus">("available");
  const SGT_CENTER = { latitude: 28.48314554739756, longitude: 76.90677133818537 };
  const [mapType, setMapType] = React.useState<"standard" | "satellite">("standard");
  const mapRef = useRef<MapView | null>(null);

  const windowHeight = Dimensions.get('window').height;
  const mapHeight = Math.round(windowHeight * 0.44);

  const CAMPUS_DELTA = { latitudeDelta: 0.0035, longitudeDelta: 0.0035 };
  const DEFAULT_DELTA = { latitudeDelta: 0.01, longitudeDelta: 0.01 };

  const availableBikes = useMemo(() => bikes.filter(bike => bike.status === "available"), []);
  const legend = [
    { label: "Available bikes", color: "#00e676" },
    { label: "Reserved", color: "#ffc107" },
    { label: "Campus safe zone", color: "#00d084" },
  ];
  const metrics = [
    { label: "Live bikes", value: availableBikes.length.toString() },
    { label: "Avg unlock", value: "2 min" },
    { label: "Coverage", value: "0.8 km²" },
  ];
  const handleOpenGoogleMap = () => {
    Linking.openURL("https://www.google.com/maps/d/u/0/edit?mid=1Cq2Eh56krTqbCTI_lSQ2j2S2jnLElzw&usp=sharing");
  };

  useEffect(() => {
    // animate map when user toggles between tabs
    if (!mapRef.current) return;
    if (selectedTab === 'campus') {
      mapRef.current.animateToRegion({
        latitude: SGT_CENTER.latitude,
        longitude: SGT_CENTER.longitude,
        ...CAMPUS_DELTA,
      }, 500);
    } else {
      mapRef.current.animateToRegion({
        latitude: SGT_CENTER.latitude,
        longitude: SGT_CENTER.longitude,
        ...DEFAULT_DELTA,
      }, 500);
    }
  }, [selectedTab]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <LinearGradient colors={["#131313", "#050505"]} style={styles.heroCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Campus Mobility</Text>
          <Text style={styles.subtitle}>Live availability and safe riding corridors for SGT University.</Text>
          <View style={styles.heroBadges}>
            <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>Live feed</Text></View>
            <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>SGT approved</Text></View>
          </View>
        </View>
        <TouchableOpacity onPress={handleOpenGoogleMap} style={styles.mapLinkButton}>
          <Text style={styles.mapLinkText}>Open map</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.metricsRow}>
        {metrics.map((metric, index) => (
          <View
            key={metric.label}
            style={[styles.metricCard, index === metrics.length - 1 && { marginRight: 0 }]}
          >
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tabsContainer}>
        <View style={styles.tabGroup}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === "available" && styles.activeTab]}
            onPress={() => setSelectedTab("available")}
          >
            <Text style={[styles.tabText, selectedTab === "available" && styles.activeTabText]}>
              {availableBikes.length} Available
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === "campus" && styles.activeTab]}
            onPress={() => setSelectedTab("campus")}
          >
            <Text style={[styles.tabText, selectedTab === "campus" && styles.activeTabText]}>
              Campus Area
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.mapTypeChip} onPress={() => setMapType(prev => prev === 'standard' ? 'satellite' : 'standard')}>
          <MaterialCommunityIcons name={mapType === 'standard' ? 'satellite-variant' : 'earth'} size={16} color="#00d084" />
          <Text style={styles.mapTypeChipText}>{mapType === 'standard' ? 'Standard' : 'Satellite'}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.mapContainer, { height: mapHeight }]}>
        <MapView
          ref={ref => { mapRef.current = ref; }}
          style={styles.map}
          mapType={mapType}
          initialRegion={{
            latitude: SGT_CENTER.latitude,
            longitude: SGT_CENTER.longitude,
            latitudeDelta: DEFAULT_DELTA.latitudeDelta,
            longitudeDelta: DEFAULT_DELTA.longitudeDelta,
          }}
        >
          <Circle
            center={SGT_CENTER}
            radius={300}
            fillColor={'rgba(0,208,132,0.12)'}
            strokeColor={'rgba(0,208,132,0.4)'}
          />
          <Marker coordinate={{ latitude: SGT_CENTER.latitude, longitude: SGT_CENTER.longitude }} />
        </MapView>
        <View style={styles.legendCard}>
          {legend.map(item => (
            <View key={item.label} style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Nearby Bikes</Text>
      {availableBikes.slice(0, 3).map((bike) => (
        <View key={bike.id} style={styles.bikeItem}>
          <View style={styles.bikeInfo}>
            <Text style={styles.bikeCode}>{bike.code}</Text>
            <Text style={styles.bikeLocation}>{bike.location} • {bike.distance}m</Text>
          </View>
          <View style={styles.bikeStatus}>
            <View style={[styles.statusDot, { backgroundColor: bike.status === 'available' ? '#00e676' : '#ffc107' }]} />
            <Text style={styles.statusText}>{bike.status}</Text>
          </View>
          {bike.status === 'available' && (
            <TouchableOpacity style={styles.navigateButton}>
              <Text style={styles.navigateText}>Navigate</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#050505",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heroCard: {
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 12,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    color: "#bcbcbc",
    fontSize: 14,
    lineHeight: 20,
  },
  heroBadges: {
    flexDirection: "row",
    marginTop: 12,
  },
  heroBadge: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  heroBadgeText: {
    color: "#99f0c8",
    fontSize: 12,
    fontWeight: "600",
  },
  mapLinkButton: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(0,208,132,0.5)",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  mapLinkText: {
    color: "#00d084",
    fontWeight: "700",
  },
  metricsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    borderRadius: 14,
    padding: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  metricValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  metricLabel: {
    color: "#9b9b9b",
    fontSize: 12,
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tabGroup: {
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#111",
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  activeTab: {
    backgroundColor: "#00d084",
  },
  tabText: {
    color: "#aaaaaa",
    fontSize: 14,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#0f0f0f",
  },
  mapTypeChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,208,132,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  mapTypeChipText: {
    color: "#00d084",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  legendCard: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendLabel: {
    color: "#fff",
    fontSize: 12,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 4,
  },
  bikeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  bikeInfo: {
    flex: 1,
  },
  bikeCode: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  bikeLocation: {
    color: "#aaaaaa",
    fontSize: 14,
  },
  bikeStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: "#aaaaaa",
    fontSize: 12,
  },
  navigateButton: {
    backgroundColor: "#00d084",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  navigateText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default MapScreen;
