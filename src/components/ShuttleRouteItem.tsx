import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShuttleRoute } from '../types/shuttle';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  route: ShuttleRoute;
}

export const ShuttleRouteItem: React.FC<Props> = ({ route }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Arriving':
        return 'clock-fast';
      case 'On Time':
        return 'check-circle';
      case 'Delayed':
        return 'alert-circle';
      default:
        return 'clock';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Arriving':
        return '#00e676';
      case 'On Time':
        return '#4caf50';
      case 'Delayed':
        return '#ffc107';
      default:
        return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.routeIndicator, { backgroundColor: route.color }]} />
        <Text style={styles.routeName}>{route.routeName}</Text>
      </View>

      {route.stops.map((stop, index) => (
        <View key={index} style={styles.stopItem}>
          <View style={styles.stopInfo}>
            <Text style={styles.stopName}>{stop.stopName}</Text>
            <Text style={styles.stopTime}>{stop.time}</Text>
          </View>
          
          <View style={styles.statusContainer}>
            <MaterialCommunityIcons 
              name={getStatusIcon(stop.status)} 
              size={16} 
              color={getStatusColor(stop.status)} 
            />
            <Text style={[styles.statusText, { color: getStatusColor(stop.status) }]}>
              {stop.status}
              {stop.delayMinutes ? ` +${stop.delayMinutes}min` : ''}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
  },
  routeName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stopItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  stopTime: {
    color: '#aaaaaa',
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});