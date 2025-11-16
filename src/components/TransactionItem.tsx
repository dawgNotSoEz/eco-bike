import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../types/wallet';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  transaction: Transaction;
}

export const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const getIcon = () => {
    switch (transaction.type) {
      case 'ride':
        return 'bike';
      case 'topup':
        return 'wallet-plus';
      case 'cashback':
        return 'gift';
      default:
        return 'cash';
    }
  };

  const getAmountColor = () => {
    return transaction.amount >= 0 ? '#00e676' : '#ff4444';
  };

  const formatAmount = () => {
    const prefix = transaction.amount >= 0 ? '+' : '';
    return `${prefix}₹${Math.abs(transaction.amount).toFixed(2)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons 
          name={getIcon()} 
          size={20} 
          color="#ffffff" 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.datetime}>{transaction.date} • {transaction.time}</Text>
      </View>

      <Text style={[styles.amount, { color: getAmountColor() }]}>
        {formatAmount()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#00d084',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#00d084',
  },
  content: {
    flex: 1,
  },
  description: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  datetime: {
    color: '#aaaaaa',
    fontSize: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});