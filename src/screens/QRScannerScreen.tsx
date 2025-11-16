import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const QRScannerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#512da8","#1976d2"]} style={styles.header}>
        <Text style={styles.headerText}>QR Scanner</Text>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.scanBox}>
          <Text style={styles.scanText}>Position QR code here</Text>
        </View>
        <TouchableOpacity style={styles.button}><Text style={styles.btnText}>Start Scanning</Text></TouchableOpacity>
        
        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>How to Scan:</Text>
          <Text style={styles.instructions}>• Hold your phone steady</Text>
          <Text style={styles.instructions}>• Position QR code in the center</Text>
          <Text style={styles.instructions}>• Ensure good lighting</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: '#0f0f0f' },
  header: { padding: 20, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  headerText: { color:'#fff', fontSize:20, fontWeight:'700' },
  body: { flex:1, alignItems:'center', justifyContent:'center', padding:16 },
  scanBox: { 
    width: 260, 
    height: 260, 
    borderWidth: 2, 
    borderColor: '#7e57c2', 
    borderStyle: 'dashed',
    borderRadius: 8, 
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scanText: {
    color: '#aaaaaa',
    fontSize: 16,
    fontWeight: '600'
  },
  button: { backgroundColor: '#00e676', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  btnText: { color:'#fff', fontWeight:'700' },
  instructionsSection: {
    marginTop: 30,
    alignItems: 'flex-start'
  },
  instructionsTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  instructions: { 
    color:'#aaaaaa', 
    marginTop: 4, 
    fontSize: 14 
  }
});

export default QRScannerScreen;
