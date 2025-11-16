import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { stations } from '../data/stations';
import { bikes } from '../data/bikes';
import { PedalBike } from '../types/pedalBike';
import { useRoute } from '@react-navigation/native';

const StationDetails: React.FC = () => {
  const route: any = useRoute();
  const stationId: number = route?.params?.stationId ?? stations[0].id;
  const station = stations.find(s => s.id === stationId) ?? stations[0];

  const bikesAtStation: PedalBike[] = bikes.filter((b: PedalBike) => b.location.includes(station.title) || b.location.includes(station.subtitle));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{station.title}</Text>
      <Text style={styles.sub}>{station.subtitle} • {station.distance}m</Text>
      <View style={styles.metrics}>
        <View style={styles.metricCard}><Text style={styles.metricLabel}>Pedal Available</Text><Text style={styles.metricValue}>{station.availablePedal ?? 0}</Text></View>
      </View>

      <Text style={[styles.section, {marginTop:12}]}>Bikes at this station</Text>
      <FlatList<PedalBike> data={bikesAtStation} keyExtractor={b=>b.id} renderItem={({item}) => (
        <View style={styles.bikeRow}><Text style={styles.bikeCode}>{item.code}</Text><Text style={styles.bikeMeta}>{item.status} • {item.distance}m</Text></View>
      )} ListEmptyComponent={<Text style={{color:'#bbb'}}>No bikes at this station</Text>} />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#0f0f0f', padding:16},
  title:{color:'#fff', fontSize:20, fontWeight:'700'},
  sub:{color:'#bbb', marginTop:8},
  metrics:{flexDirection:'row', marginTop:12},
  metricCard:{backgroundColor:'#1a1a1a', padding:12, borderRadius:10, marginRight:8},
  metricLabel:{color:'#bbb'},
  metricValue:{color:'#fff', fontWeight:'700', fontSize:18},
  section:{color:'#fff', fontWeight:'700'},
  bikeRow:{backgroundColor:'#121212', padding:10, borderRadius:10, marginTop:8},
  bikeCode:{color:'#fff', fontWeight:'700'},
  bikeMeta:{color:'#bbb', marginTop:4}
});

export default StationDetails;
