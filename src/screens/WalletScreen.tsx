import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransactionItem } from '../components/TransactionItem';
import { wallet } from '../data/wallet';
import { useNavigation } from '@react-navigation/native';

export const WalletScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [accountBalance, setAccountBalance] = useState(wallet.balance);
  const [rfidBalance, setRfidBalance] = useState(150.0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState(wallet.transactions);
  const [isProcessing, setIsProcessing] = useState(false);

  const quickValues = useMemo(() => [100, 250, 500], []);

  const handleRecharge = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid amount", "Enter a positive amount to transfer.");
      return;
    }
    if (numericAmount > accountBalance) {
      Alert.alert("Insufficient balance", "Not enough wallet funds to load the RFID card.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setAccountBalance(prev => parseFloat((prev - numericAmount).toFixed(2)));
      setRfidBalance(prev => parseFloat((prev + numericAmount).toFixed(2)));
      const now = new Date();
      const newTransaction = {
        id: `tx-${now.getTime()}`,
        type: "topup" as const,
        description: `RFID recharge • ₹${numericAmount.toFixed(2)}`,
        amount: -numericAmount,
        date: "Today",
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setTransactions(prev => [newTransaction, ...prev]);
      setAmount("");
      setIsProcessing(false);
      Alert.alert("Success", "Amount loaded to your RFID card.");
    }, 900);
  };

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
          <Text style={styles.balanceLabel}>Wallet balance</Text>
          <Text style={styles.balanceAmount}>₹{accountBalance.toFixed(2)}</Text>

          <View style={styles.splitRow}>
            <View style={[styles.splitCard, { marginRight: 12 }]}>
              <Text style={styles.splitLabel}>RFID card</Text>
              <Text style={styles.splitValue}>₹{rfidBalance.toFixed(2)}</Text>
            </View>
            <View style={styles.splitCard}>
              <Text style={styles.splitLabel}>Auto recharge</Text>
              <Text style={styles.splitValue}>{wallet.autoRechargeEnabled ? "Enabled" : "Disabled"}</Text>
            </View>
          </View>
          
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

        {/* Recharge Module */}
        <View style={styles.transferCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Load RFID card</Text>
              <Text style={styles.sectionSubtitle}>Funds move instantly from wallet to your NFC bike card.</Text>
            </View>
            <MaterialCommunityIcons name="credit-card-wireless" size={20} color="#9decc6" />
          </View>

          <View style={styles.amountRow}>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor="#666"
              style={styles.amountInput}
            />
            <TouchableOpacity style={styles.transferButton} onPress={handleRecharge} disabled={isProcessing}>
              {isProcessing ? (
                <ActivityIndicator color="#051b12" />
              ) : (
                <Text style={styles.transferText}>Transfer</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.quickRow}>
            {quickValues.map(value => (
              <TouchableOpacity key={value} style={styles.quickChip} onPress={() => setAmount(value.toString())}>
                <Text style={styles.quickChipText}>₹{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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

          {transactions.slice(0, 5).map((transaction) => (
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
  splitRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  splitCard: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    padding: 12,
    borderRadius: 12,
  },
  splitLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginBottom: 4,
  },
  splitValue: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
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
  transferCard: {
    backgroundColor: "#101010",
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  sectionSubtitle: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
  amountRow: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  amountInput: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginRight: 12,
  },
  transferButton: {
    backgroundColor: "#00d084",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  transferText: {
    color: "#051b12",
    fontWeight: "800",
  },
  quickRow: {
    flexDirection: "row",
    marginTop: 14,
  },
  quickChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 10,
    backgroundColor: "#1a1a1a",
  },
  quickChipText: {
    color: "#9decc6",
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
