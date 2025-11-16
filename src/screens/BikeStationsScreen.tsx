import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { stations as mockStations } from "../data/stations";

const BikeStationsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bike Stations - {mockStations.length} Active</Text>
      <FlatList
        data={mockStations}
        keyExtractor={(s) => s.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.sub}>{item.subtitle} • {item.availablePedal} pedal</Text>
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
  name: { color: '#fff', fontSize: 16 },
  sub: { color: '#bbb', marginTop: 4 },
});

export default BikeStationsScreen;
