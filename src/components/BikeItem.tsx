import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PedalBike } from '../types/bike';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  bike: PedalBike;
  onPress?: () => void;
}

export const BikeItem: React.FC<Props> = ({ bike, onPress }) => {
  const getStatusColor = () => {
    switch (bike.status) {
      case 'available':
        return '#00e676';
      case 'maintenance':
        return '#ffc107';
      case 'rented':
        return '#757575';
      default:
        return '#757575';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      disabled={bike.status !== 'available'}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.code}>{bike.code}</Text>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
      </View>
      
      <Text style={styles.location}>{bike.location}</Text>
      <Text style={styles.distance}>{bike.distance}m away</Text>
      
      <View style={styles.footer}>
        <Text style={styles.price}>₹{bike.pricePerMin}/min</Text>
        <MaterialCommunityIcons name="bike" size={20} color="#aaaaaa" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#00d084',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  code: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  location: {
    color: '#aaaaaa',
    fontSize: 14,
    marginBottom: 4,
  },
  distance: {
    color: '#666666',
    fontSize: 12,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#00d084',
    fontSize: 14,
    fontWeight: '600',
  },
});