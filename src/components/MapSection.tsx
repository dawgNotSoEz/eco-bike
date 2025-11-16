import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, MapType, Region, Polygon } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const MapSection: React.FC = () => {
  // SGT University exact center as requested
  const SGT_COORD = { latitude: 28.48314554739756, longitude: 76.90677133818537 };
  const [mapType, setMapType] = useState<MapType>("standard");

  // Bounding box for SGT campus (approx) - keeps user roughly inside campus
  const MIN_LAT = 28.48;
  const MAX_LAT = 28.49;
  const MIN_LNG = 76.905;
  const MAX_LNG = 76.91;

  const [region, setRegion] = useState<Region>({
    latitude: SGT_COORD.latitude,
    longitude: SGT_COORD.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        mapType={mapType}
        onRegionChangeComplete={(r) => {
          // clamp region to campus bounds
          const clampedLat = Math.max(MIN_LAT, Math.min(MAX_LAT, r.latitude));
          const clampedLng = Math.max(MIN_LNG, Math.min(MAX_LNG, r.longitude));
          if (clampedLat !== r.latitude || clampedLng !== r.longitude) {
            setRegion((prev) => ({ ...prev, latitude: clampedLat, longitude: clampedLng }));
          } else {
            setRegion(r);
          }
        }}
      >
        {/* Center marker only */}
        <Marker coordinate={{ latitude: SGT_COORD.latitude, longitude: SGT_COORD.longitude }} />
      </MapView>

      <View style={styles.chipsContainer} pointerEvents="box-none">
        <View style={styles.zoneChip}><Text style={styles.zoneText}>SGT Campus Zone</Text></View>
        <View style={styles.weatherChip}><Text style={styles.weatherText}>22° C Perfect for riding</Text></View>

        <TouchableOpacity
          style={styles.earthBtn}
          onPress={() => setMapType(prev => prev === "standard" ? "satellite" : "standard")}
        >
          <MaterialCommunityIcons name={mapType === "standard" ? "satellite" : "earth"} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  chipsContainer: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  zoneChip: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  zoneText: {
    color: "#000",
    fontWeight: "700",
  },
  weatherChip: {
    backgroundColor: "rgba(78,0,194,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  weatherText: {
    color: "#fff",
    fontWeight: "600",
  },
  earthBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 10,
    marginLeft: 8
  }
});

export default MapSection;
