import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SupportTicket } from '../types/support';

interface Props {
  ticket: SupportTicket;
}

export const SupportTicketItem: React.FC<Props> = ({ ticket }) => {
  const getStatusColor = () => {
    switch (ticket.status) {
      case 'resolved':
        return '#4caf50';
      case 'pending':
        return '#ffc107';
      case 'open':
        return '#2196f3';
      default:
        return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{ticket.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{ticket.status}</Text>
        </View>
      </View>
      
      <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
      <Text style={styles.date}>{ticket.daysAgo} days ago</Text>
    </View>
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
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  ticketNumber: {
    color: '#aaaaaa',
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    color: '#666666',
    fontSize: 12,
  },
});