import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { bikes } from "../data/bikes";

export const MapScreen: React.FC = () => {
  const [mapboxToken, setMapboxToken] = useState("");
  const [selectedTab, setSelectedTab] = useState<"available" | "campus">("available");

  // SGT University exact center
  const SGT_CENTER = { latitude: 28.48314554739756, longitude: 76.90677133818537 };
  const [mapType, setMapType] = React.useState<"standard" | "satellite">("standard");

  const availableBikes = bikes.filter(bike => bike.status === "available");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Bikes</Text>
        <TouchableOpacity style={styles.locationPill}>
          <Text style={styles.locationText}>My Location</Text>
        </TouchableOpacity>
      </View>

      {/* Mapbox Token Section */}
      <View style={styles.tokenSection}>
        <Text style={styles.tokenTitle}>Enter Mapbox Token</Text>
        <Text style={styles.tokenSubtitle}>Get your token from mapbox.com</Text>
        <TextInput
          style={styles.tokenInput}
          placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja..."
          placeholderTextColor="#666666"
          value={mapboxToken}
          onChangeText={setMapboxToken}
        />
        <Text style={styles.tokenNote}>Token will show SGT University Gurgaon</Text>
      </View>

      {/* Campus Tabs */}
      <View style={styles.tabsContainer}>
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

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          mapType={mapType}
          initialRegion={{
            latitude: SGT_CENTER.latitude,
            longitude: SGT_CENTER.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
      {/* Center pin for SGT University */}
      <Marker coordinate={{ latitude: SGT_CENTER.latitude, longitude: SGT_CENTER.longitude }} />
        </MapView>
      </View>

      <TouchableOpacity
        style={{position:'absolute', right:30, top:120, backgroundColor:'rgba(0,0,0,0.5)', padding:8, borderRadius:8}}
        onPress={() => setMapType(prev => prev === 'standard' ? 'satellite' : 'standard')}
      >
        <MaterialCommunityIcons name={mapType === 'standard' ? 'satellite' : 'earth'} size={20} color="#fff" />
      </TouchableOpacity>

      {/* Nearby Bikes List */}
      <Text style={styles.sectionTitle}>Nearby Bikes</Text>
      <ScrollView style={styles.bikesList}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0f0f0f",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  locationPill: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  locationText: {
    color: "#00d084",
    fontSize: 12,
    fontWeight: "600",
  },
  tokenSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#1a1a1a",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  tokenTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  tokenSubtitle: {
    color: "#aaaaaa",
    fontSize: 14,
    marginBottom: 12,
  },
  tokenInput: {
    backgroundColor: "#333333",
    color: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  tokenNote: {
    color: "#666666",
    fontSize: 12,
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
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
    color: "#ffffff",
  },
  mapContainer: {
    height: 200,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  bikesList: {
    flex: 1,
    paddingHorizontal: 20,
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
