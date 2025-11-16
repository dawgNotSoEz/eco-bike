import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransactionItem } from '../components/TransactionItem';
import { wallet } from '../data/wallet';
import { useNavigation } from '@react-navigation/native';

export const WalletScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Wallet</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={['#00d084', '#00a067']}
          style={styles.balanceCard}
        >
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹{wallet.balance.toFixed(2)}</Text>
          
          <TouchableOpacity 
            style={styles.addMoneyButton}
            onPress={() => navigation.navigate('PaymentGateway')}
          >
            <Text style={styles.addMoneyText}>+ Add Money</Text>
          </TouchableOpacity>

          {wallet.isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </LinearGradient>

        {/* Action Cards */}
        <View style={styles.actionCards}>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#7e57c2' }]}>
            <MaterialCommunityIcons name="autorenew" size={24} color="#ffffff" />
            <Text style={styles.actionCardTitle}>Auto Recharge</Text>
            <Text style={styles.actionCardSubtitle}>
              {wallet.autoRechargeEnabled ? 'Enabled' : 'Disabled'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#ff9800' }]}>
            <MaterialCommunityIcons name="gift" size={24} color="#ffffff" />
            <Text style={styles.actionCardTitle}>Rewards</Text>
            <Text style={styles.actionCardSubtitle}>Earn cashbacks</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {wallet.transactions.slice(0, 4).map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0f0f0f",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  balanceCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addMoneyButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  addMoneyText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  premiumBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  premiumText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  actionCards: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginRight: 10,
    alignItems: "center",
  },
  actionCardTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },
  actionCardSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#00d084",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default WalletScreen;
