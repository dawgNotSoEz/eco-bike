import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { mockSupportTickets } from '../data/supportTickets';

const HelpSupportScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#512da8","#1976d2"]} style={styles.header}>
        <Text style={styles.headerText}>Help & Support</Text>
      </LinearGradient>
      <View style={styles.body}>
        <TouchableOpacity style={[styles.card, {borderLeftWidth:4, borderLeftColor:'#00e676'}]}><Text style={styles.cardTitle}>24/7 Support Available</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.card, {borderLeftWidth:4, borderLeftColor:'#5c6bc0'}]}><Text style={styles.cardTitle}>Live Chat</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.card, {borderLeftWidth:4, borderLeftColor:'#00c853'}]}><Text style={styles.cardTitle}>Call Support</Text></TouchableOpacity>

        <Text style={styles.sectionTitle}>Recent Tickets</Text>
        <FlatList data={mockSupportTickets} keyExtractor={(t) => t.id} renderItem={({item}) => (
          <View style={styles.ticket}><Text style={styles.ticketTitle}>{item.title}</Text><Text style={styles.ticketMeta}>{item.status} • {item.createdAt}</Text></View>
        )} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#0f0f0f'},
  header:{padding:20, borderBottomLeftRadius:12, borderBottomRightRadius:12},
  headerText:{color:'#fff', fontSize:20, fontWeight:'700'},
  body:{padding:16},
  card:{backgroundColor:'#1a1a1a', padding:12, borderRadius:12, marginBottom:12},
  cardTitle:{color:'#fff', fontWeight:'700'},
  sectionTitle:{color:'#fff', fontWeight:'700', marginTop:12, marginBottom:8},
  ticket:{backgroundColor:'#121212', padding:10, borderRadius:10, marginBottom:8},
  ticketTitle:{color:'#fff', fontWeight:'700'},
  ticketMeta:{color:'#bbb', marginTop:4}
});

export default HelpSupportScreen;
