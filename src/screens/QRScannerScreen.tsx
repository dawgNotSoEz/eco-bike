import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';

const QRScannerScreen: React.FC = () => {
  const [flashOn, setFlashOn] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [lastCode, setLastCode] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    setLastCode(data);
  };

  const handlePrimaryAction = () => {
    if (manualMode) {
      setLastCode('#A7-92');
      setScanned(true);
      return;
    }
    setScanned(false);
    setLastCode(null);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#050505","#121212"]} style={styles.header}>
        <View>
          <Text style={styles.headerText}>Scan QR to unlock</Text>
          <Text style={styles.headerSubtitle}>Align the campus bike QR inside the frame</Text>
        </View>
        <View style={styles.badge}>
          <MaterialCommunityIcons name="lock-open-outline" size={14} color="#00d084" />
          <Text style={styles.badgeText}>Secure session</Text>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.cameraShell}>
          {!manualMode && permission?.granted && (
            <CameraView
              style={StyleSheet.absoluteFillObject}
              facing="back"
              enableTorch={flashOn}
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            >
              <View style={styles.cameraOverlay}>
                {!scanned ? (
                  <View style={styles.scanHelper}>
                    <MaterialCommunityIcons name="qrcode-scan" size={36} color="#7ef7c7" />
                    <Text style={styles.scanText}>Align QR inside the frame</Text>
                  </View>
                ) : (
                  <View style={styles.scanResult}>
                    <MaterialCommunityIcons name="check-circle" size={28} color="#00d084" />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.resultLabel}>Linked code</Text>
                      <Text style={styles.resultValue}>{lastCode}</Text>
                    </View>
                  </View>
                )}
              </View>
            </CameraView>
          )}

          {!manualMode && permission && !permission.granted && (
            <View style={styles.permissionBox}>
              <Text style={styles.permissionTitle}>Camera access needed</Text>
              <Text style={styles.permissionText}>Grant access to scan EcoCycle QR stickers.</Text>
              <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                <Text style={styles.permissionButtonText}>Allow camera</Text>
              </TouchableOpacity>
            </View>
          )}

          {manualMode && (
            <View style={styles.manualBox}>
              <Text style={styles.manualLabel}>Manual unlock code</Text>
              <Text style={styles.manualHint}>#A7-92</Text>
            </View>
          )}

          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />
        </View>

        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.controlChip} onPress={() => setFlashOn(prev => !prev)}>
            <MaterialCommunityIcons name={flashOn ? 'flashlight' : 'flashlight-off'} size={18} color="#00d084" />
            <Text style={styles.controlText}>{flashOn ? 'Flash on' : 'Flash off'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlChip} onPress={() => setManualMode(prev => !prev)}>
            <MaterialCommunityIcons name="keyboard-outline" size={18} color="#00d084" />
            <Text style={styles.controlText}>{manualMode ? 'Show scanner' : 'Enter code'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlChip}>
            <MaterialCommunityIcons name="history" size={18} color="#00d084" />
            <Text style={styles.controlText}>History</Text>
          </TouchableOpacity>
        </View>

        {lastCode && !manualMode && (
          <View style={styles.resultBanner}>
            <Text style={styles.resultBannerText}>Last scan: {lastCode}</Text>
            <TouchableOpacity onPress={() => { setLastCode(null); setScanned(false); }}>
              <Text style={styles.resultBannerAction}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handlePrimaryAction}>
          <Text style={styles.btnText}>
            {manualMode ? 'Verify code' : scanned ? 'Scan again' : 'Start scanning'}
          </Text>
        </TouchableOpacity>

        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>Pro tips</Text>
          <View style={styles.tipRow}>
            <MaterialCommunityIcons name="shield-check" size={16} color="#7ef7c7" />
            <Text style={styles.instructions}>Scan only official EcoCycle QR stickers</Text>
          </View>
          <View style={styles.tipRow}>
            <MaterialCommunityIcons name="brightness-6" size={16} color="#7ef7c7" />
            <Text style={styles.instructions}>Use the flash toggle in low light</Text>
          </View>
          <View style={styles.tipRow}>
            <MaterialCommunityIcons name="arrow-expand" size={16} color="#7ef7c7" />
            <Text style={styles.instructions}>Keep the code within the neon frame</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: '#050505' },
  header: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { color:'#fff', fontSize:24, fontWeight:'800' },
  headerSubtitle: { color:'#8f9a95', marginTop:6, fontSize:14 },
  badge: { flexDirection:'row', alignItems:'center', borderWidth:1, borderColor:'rgba(0,208,132,0.4)', borderRadius:999, paddingHorizontal:12, paddingVertical:6 },
  badgeText: { color:'#00d084', fontSize:12, fontWeight:'600', marginLeft:6 },
  body: { flex:1, alignItems:'center', padding:20 },
  cameraShell: { width: 290, height: 290, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(126,247,199,0.3)', justifyContent:'center', alignItems:'center', marginBottom: 18, position:'relative', backgroundColor:'#0b0b0b', overflow:'hidden' },
  cameraOverlay: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.15)' },
  cornerTL: { position:'absolute', top:14, left:14, width:40, height:40, borderTopWidth:3, borderLeftWidth:3, borderColor:'#00d084', borderRadius:8 },
  cornerTR: { position:'absolute', top:14, right:14, width:40, height:40, borderTopWidth:3, borderRightWidth:3, borderColor:'#00d084', borderRadius:8 },
  cornerBL: { position:'absolute', bottom:14, left:14, width:40, height:40, borderBottomWidth:3, borderLeftWidth:3, borderColor:'#00d084', borderRadius:8 },
  cornerBR: { position:'absolute', bottom:14, right:14, width:40, height:40, borderBottomWidth:3, borderRightWidth:3, borderColor:'#00d084', borderRadius:8 },
  scanHelper: { alignItems:'center' },
  scanText: { color: '#7ef7c7', fontSize: 14, marginTop: 8, fontWeight:'600' },
  scanResult: { flexDirection:'row', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)', padding:12, borderRadius:12 },
  resultLabel: { color:'#9ea3a0', fontSize:12, textTransform:'uppercase', letterSpacing:1 },
  resultValue: { color:'#ffffff', fontSize:16, fontWeight:'700' },
  manualBox: { alignItems:'center' },
  manualLabel: { color:'#9ea3a0', textTransform:'uppercase', fontSize:12, letterSpacing:1 },
  manualHint: { color:'#fff', fontSize:32, fontWeight:'800', marginTop:8 },
  permissionBox: { alignItems:'center', paddingHorizontal:20 },
  permissionTitle: { color:'#fff', fontSize:16, fontWeight:'700', marginBottom:6 },
  permissionText: { color:'#9ea3a0', fontSize:13, marginBottom:12, textAlign:'center' },
  permissionButton: { backgroundColor:'#00d084', borderRadius:10, paddingHorizontal:18, paddingVertical:10 },
  permissionButtonText: { color:'#041b12', fontWeight:'700' },
  controlsRow: { flexDirection:'row', justifyContent:'space-between', width:'100%', marginBottom:16 },
  controlChip: { flexDirection:'row', alignItems:'center', borderRadius:999, borderWidth:1, borderColor:'rgba(255,255,255,0.1)', paddingHorizontal:14, paddingVertical:8, backgroundColor:'#111' },
  controlText: { color:'#cfd4d1', fontSize:12, fontWeight:'600', marginLeft:6 },
  resultBanner: { width:'100%', padding:12, borderRadius:12, backgroundColor:'rgba(0,208,132,0.12)', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12 },
  resultBannerText: { color:'#caffe7', fontWeight:'600' },
  resultBannerAction: { color:'#00d084', fontWeight:'700' },
  button: { backgroundColor: '#00d084', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, width:'100%', alignItems:'center' },
  btnText: { color:'#041b12', fontWeight:'800', letterSpacing:0.5 },
  instructionsSection: { marginTop: 26, width:'100%' },
  instructionsTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  tipRow: { flexDirection:'row', alignItems:'center', marginTop:6 },
  instructions: { color:'#9ea3a0', marginLeft:8, fontSize:13 },
});

export default QRScannerScreen;
