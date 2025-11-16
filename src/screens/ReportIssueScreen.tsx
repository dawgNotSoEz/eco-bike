import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ReportIssueScreen: React.FC = () => {
  const [selected, setSelected] = useState<'mechanical'|'physical'|'app'>('mechanical');

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#ff3d00","#ff9100"]} style={styles.header}><Text style={styles.headerText}>Report Issue</Text></LinearGradient>
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Select Issue Type</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.issueCard, selected==='mechanical' && styles.issueSelected, {backgroundColor:'#e53935'}]} onPress={() => setSelected('mechanical')}><Text style={styles.issueText}>Mechanical Issue</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.issueCard, selected==='physical' && styles.issueSelected, {backgroundColor:'#ec407a'}]} onPress={() => setSelected('physical')}><Text style={styles.issueText}>Physical Damage</Text></TouchableOpacity>
        </View>
        <View style={styles.row}><TouchableOpacity style={[styles.issueCard, selected==='app' && styles.issueSelected, {backgroundColor:'#7e57c2'}]} onPress={() => setSelected('app')}><Text style={styles.issueText}>App / System Bug</Text></TouchableOpacity></View>

        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.card}><Text style={{color:'#fff'}}>SGT University Campus, Gurugram, Haryana (Lat: 28.4, Lon: 77.02)</Text></View>

        <Text style={styles.sectionTitle}>Add Photo</Text>
        <TouchableOpacity style={styles.photo}><Text style={{color:'#fff'}}>Upload Photo (optional)</Text></TouchableOpacity>

        <TouchableOpacity style={styles.submit}><Text style={{color:'#fff'}}>Submit Report</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#0f0f0f'},
  header:{padding:20, borderBottomLeftRadius:12, borderBottomRightRadius:12},
  headerText:{color:'#fff', fontSize:20, fontWeight:'700'},
  body:{padding:16},
  sectionTitle:{color:'#fff', fontWeight:'700', marginTop:12, marginBottom:8},
  row:{flexDirection:'row', justifyContent:'space-between'},
  issueCard:{flex:1, padding:12, borderRadius:12, margin:6, alignItems:'center'},
  issueText:{color:'#fff', fontWeight:'700'},
  issueSelected:{borderWidth:3, borderColor:'#fff'},
  card:{backgroundColor:'#1a1a1a', padding:12, borderRadius:12},
  photo:{backgroundColor:'#121212', padding:12, borderRadius:12, alignItems:'center', marginTop:8},
  submit:{backgroundColor:'#ff7043', padding:12, borderRadius:12, alignItems:'center', marginTop:16}
});

export default ReportIssueScreen;
