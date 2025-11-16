import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { bookings } from "../data/bookings";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BookingScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#ff7a00', '#ff5722']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book in Advance</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <View style={styles.content}>
        <FlatList
          data={bookings}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.bookingHeader}>
                <Text style={styles.bookingTime}>{item.bookingTime}</Text>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'confirmed' ? '#00e676' : '#ffc107' }]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.station}>{item.station}</Text>
              <Text style={styles.estimate}>₹{item.priceEstimate.toFixed(2)} estimated</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.button}><Text style={styles.btnText}>Modify</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancel]}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>Booking Tips</Text>
              <Text style={styles.tipText}>• Book up to 24 hours in advance</Text>
              <Text style={styles.tipText}>• Free cancellation up to 2 hours before</Text>
              <Text style={styles.tipText}>• 15-minute grace period for pickup</Text>
              <Text style={styles.tipText}>• Get 10% discount on advance bookings</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: { 
    backgroundColor: '#1a1a1a', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12 
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingTime: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  station: { 
    color: '#aaaaaa', 
    fontSize: 14,
    marginBottom: 4,
  },
  estimate: {
    color: '#00d084',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  actions: { 
    flexDirection: 'row', 
    marginTop: 8 
  },
  button: { 
    flex: 1,
    padding: 12, 
    backgroundColor: '#333333', 
    borderRadius: 8, 
    marginRight: 8,
    alignItems: 'center',
  },
  cancel: { 
    backgroundColor: '#ff4444',
    marginRight: 0,
  },
  btnText: { 
    color: '#fff',
    fontWeight: '600',
  },
  tipsSection: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  tipsTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tipText: {
    color: '#aaaaaa',
    fontSize: 14,
    marginBottom: 4,
  },
});

export default BookingScreen;
