import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const routes = [
  { routeName: 'SGT Campus Loop', stops: [{stopName: 'Library', time: '08:10', status: 'On Time'}, {stopName: 'Main Gate', time: '08:20', status: 'Arriving'}] },
  { routeName: 'SGT Express', stops: [{stopName: 'Parking', time: '08:00', status: 'Delayed'}, {stopName: 'Hostel A', time: '08:15', status: 'On Time'}] },
];

const ShuttleScheduleScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shuttle Schedule</Text>
      <FlatList
        data={routes}
        keyExtractor={(r) => r.routeName}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.route}>{item.routeName}</Text>
            {item.stops.map((s) => (
              <Text key={s.stopName} style={styles.stop}>{s.stopName} • {s.time} • {s.status}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#0f0f0f', padding:16 },
  title: { color:'#fff', fontSize:20, fontWeight:'700', marginBottom:12 },
  card: { backgroundColor:'#1a1a1a', padding:12, borderRadius:12, marginBottom:12 },
  route: { color:'#fff', fontSize:16, fontWeight:'700' },
  stop: { color:'#bbb', marginTop:6 }
});

export default ShuttleScheduleScreen;
