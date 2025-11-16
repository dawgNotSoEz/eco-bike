import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { bikes } from '../data/bikes';

const SelectBikeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Pedal Bikes</Text>
      <FlatList
  data={bikes}
        keyExtractor={(b) => b.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.code}>{item.code} • {item.location}</Text>
            <Text style={styles.meta}>Status: {item.status} • ₹{item.pricePerMin}/min • {item.distance}m</Text>
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
  code: { color:'#fff', fontSize:16 },
  meta: { color:'#bbb', marginTop:4 }
});

export default SelectBikeScreen;
