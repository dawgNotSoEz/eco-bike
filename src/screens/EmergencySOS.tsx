import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const EmergencySOS: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#ff3d00","#ff9100"]} style={styles.header}>
        <Text style={styles.headerText}>Emergency SOS</Text>
      </LinearGradient>

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Emergency Options</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.sosCard, {backgroundColor:'#ff4d4d'}]}><Text style={styles.sosText}>Medical Emergency{'\n'}Call 108</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.sosCard, {backgroundColor:'#ff9800'}]}><Text style={styles.sosText}>Campus Security</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.sosCard, {backgroundColor:'#2196f3'}]}><Text style={styles.sosText}>Bike Emergency</Text></TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, {marginTop:20}]}>Emergency Contacts</Text>
        <View style={styles.card}><Text style={styles.contact}>Campus Security: +91-XXX-XXX-XXXX</Text></View>
        <View style={styles.card}><Text style={styles.contact}>Medical Emergency: 108</Text></View>
        <View style={styles.card}><Text style={styles.contact}>Bike Support: +91-XXX-XXX-BIKE</Text></View>
        
        <Text style={[styles.sectionTitle, {marginTop:20}]}>Safety Tips</Text>
        <View style={styles.card}><Text style={styles.contact}>Stay calm and assess the situation</Text></View>
        <View style={styles.card}><Text style={styles.contact}>Share your location with emergency contacts</Text></View>
        <View style={styles.card}><Text style={styles.contact}>Move to a safe location if possible</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: '#0f0f0f' },
  header: { padding: 20, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  headerText: { color:'#fff', fontSize:20, fontWeight:'700' },
  body: { padding:16 },
  sectionTitle: { color:'#fff', fontSize:16, fontWeight:'700', marginBottom:8 },
  row: { flexDirection:'row', justifyContent:'space-between' },
  sosCard: { flex:1, padding:16, borderRadius:12, margin:6, alignItems:'center' },
  sosText: { color:'#fff', fontWeight:'700' },
  card: { backgroundColor:'#1a1a1a', padding:12, borderRadius:12, marginTop:8 },
  contact: { color:'#fff' }
});

export default EmergencySOS;
