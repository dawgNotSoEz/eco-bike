import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { wallet } from '../data/wallet';
import { LinearGradient } from "expo-linear-gradient";

export const PaymentGatewayScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedAmount, setSelectedAmount] = useState(200);
  const [selectedMethod, setSelectedMethod] = useState<string>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusIndex, setStatusIndex] = useState(-1);
  const [feedEntries, setFeedEntries] = useState(() => ([
    { id: 'seed-1', stage: 'RFID sync', detail: '₹200 pushed to card • UPI', timestamp: '09:15 AM' },
    { id: 'seed-2', stage: 'Wallet credit', detail: '₹350 added via net banking', timestamp: '08:40 AM' },
  ]));
  const timeouts = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const amounts = [100, 200, 500, 1000];
  const liveSteps = [
    {
      title: "UPI authorization",
      subtitle: "Awaiting confirmation from your bank app",
      icon: "cellphone-check",
    },
    {
      title: "Wallet credit",
      subtitle: "Funds are moving into Eco Wallet",
      icon: "wallet-plus",
    },
    {
      title: "RFID sync",
      subtitle: "Amount pushed to your bike access card",
      icon: "nfc",
    },
  ];

  const pushFeed = (stage: string, detail: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setFeedEntries(prev => [
      { id: `feed-${Date.now()}-${stage}`, stage, detail, timestamp },
      ...prev,
    ].slice(0, 6));
  };

  const startProcessing = () => {
    if (isProcessing) return;
    const amountSnapshot = selectedAmount;
    const methodSnapshot = selectedMethod.toUpperCase();
    setIsProcessing(true);
    setStatusIndex(0);
    pushFeed('Session started', `₹${amountSnapshot} via ${methodSnapshot}`);
    liveSteps.forEach((_step, idx) => {
      const timeout = setTimeout(() => {
        setStatusIndex(idx);
        const label = liveSteps[idx].title;
        const detail = idx === liveSteps.length - 1
          ? `RFID ready • ₹${amountSnapshot}`
          : liveSteps[idx].subtitle;
        pushFeed(label, detail);
        if (idx === liveSteps.length - 1) {
          setIsProcessing(false);
          const doneTimeout = setTimeout(() => navigation.goBack(), 700);
          timeouts.current.push(doneTimeout);
        }
      }, idx * 1200);
      timeouts.current.push(timeout);
    });
  };

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Money</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Hero Summary */}
        <LinearGradient colors={["#091510", "#010101"]} style={styles.heroCard}>
          <View>
            <Text style={styles.heroLabel}>You’re adding</Text>
            <Text style={styles.heroAmount}>₹{selectedAmount}</Text>
          </View>
          <View style={styles.heroDivider} />
          <View>
            <Text style={styles.heroLabel}>Method</Text>
            <Text style={styles.heroMethod}>{selectedMethod === "upi" ? "UPI" : selectedMethod === "card" ? "Card" : "Net banking"}</Text>
            <Text style={styles.heroHint}>Wallet → RFID in ~5s</Text>
          </View>
        </LinearGradient>

        {/* Amount Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Amount</Text>
          <View style={styles.amountGrid}>
            {amounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountCard,
                  selectedAmount === amount && styles.selectedAmountCard
                ]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text style={[
                  styles.amountText,
                  selectedAmount === amount && styles.selectedAmountText
                ]}>
                  ₹{amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Live Feed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live recharge feed</Text>
            {isProcessing ? (
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>Processing</Text>
              </View>
            ) : (
              <Text style={styles.liveHint}>Idle</Text>
            )}
          </View>
          {liveSteps.map((step, idx) => {
            const active = statusIndex >= idx;
            return (
              <View key={step.title} style={[styles.liveRow, active && styles.liveRowActive]}>
                <View style={[styles.liveIcon, active && styles.liveIconActive]}>
                  <MaterialCommunityIcons
                    name={active ? "check" : (step.icon as any)}
                    size={18}
                    color={active ? "#051b12" : "#9decc6"}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.liveTitle, active && styles.liveTitleActive]}>{step.title}</Text>
                  <Text style={styles.liveSubtitle}>{step.subtitle}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recharge timeline</Text>
          <View style={styles.feedCard}>
            {feedEntries.map((entry) => (
              <View key={entry.id} style={styles.feedRow}>
                <View style={styles.feedBadge}>
                  <Text style={styles.feedBadgeText}>{entry.stage}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.feedDetail}>{entry.detail}</Text>
                  <Text style={styles.feedMeta}>{entry.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Payment Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Options</Text>
          
          <TouchableOpacity 
            style={[styles.paymentOption, selectedMethod === 'upi' && styles.selectedPaymentOption]}
            onPress={() => setSelectedMethod('upi')}
          >
            <View style={styles.paymentIcon}>
              <MaterialCommunityIcons name="cash" size={24} color="#00d084" />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>UPI Payment</Text>
              <Text style={styles.paymentSubtitle}>Recommended</Text>
            </View>
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, selectedMethod === 'card' && styles.selectedPaymentOption]}
            onPress={() => setSelectedMethod('card')}
          >
            <View style={styles.paymentIcon}>
              <MaterialCommunityIcons name="credit-card" size={24} color="#2196f3" />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Credit/Debit Card</Text>
              <Text style={styles.paymentSubtitle}>Visa, Mastercard, RuPay</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, selectedMethod === 'netbanking' && styles.selectedPaymentOption]}
            onPress={() => setSelectedMethod('netbanking')}
          >
            <View style={styles.paymentIcon}>
              <MaterialCommunityIcons name="bank" size={24} color="#ff9800" />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Net Banking</Text>
              <Text style={styles.paymentSubtitle}>All major banks supported</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Saved Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
          
          {wallet.savedMethods.map((method) => (
            <TouchableOpacity key={method.id} style={styles.savedMethod}>
              <View style={styles.paymentIcon}>
                <MaterialCommunityIcons 
                  name={method.type === 'upi' ? 'cash' : 'credit-card'} 
                  size={24} 
                  color="#ffffff" 
                />
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentTitle}>{method.display}</Text>
                {method.isPrimary && (
                  <Text style={styles.primaryText}>Primary</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addMethodButton}>
            <MaterialCommunityIcons name="plus" size={20} color="#00d084" />
            <Text style={styles.addMethodText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.payButton, isProcessing && { opacity: 0.5 }]}
          onPress={startProcessing}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#04150f" />
          ) : (
            <Text style={styles.payButtonText}>Pay ₹{selectedAmount}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#050505",
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
  heroCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    flexDirection: "row",
    alignItems: "center",
  },
  heroLabel: {
    color: "#9ab5a9",
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  heroAmount: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 6,
  },
  heroDivider: {
    width: 1,
    height: 48,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginHorizontal: 18,
  },
  heroMethod: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },
  heroHint: {
    color: "#6f8377",
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,208,132,0.12)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00d084",
    marginRight: 6,
  },
  liveText: {
    color: "#00d084",
    fontSize: 12,
    fontWeight: "600",
  },
  liveHint: {
    color: "#888",
    fontSize: 12,
  },
  liveRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 10,
    backgroundColor: "#0f0f0f",
  },
  liveRowActive: {
    borderColor: "rgba(0,208,132,0.4)",
    backgroundColor: "rgba(0,208,132,0.08)",
  },
  liveIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  liveIconActive: {
    backgroundColor: "#00d084",
    borderColor: "#00d084",
  },
  liveTitle: {
    color: "#9ab5a9",
    fontWeight: "600",
  },
  liveTitleActive: {
    color: "#051b12",
  },
  liveSubtitle: {
    color: "#8c8c8c",
    fontSize: 12,
    marginTop: 2,
  },
  feedCard: {
    backgroundColor: "#0b0b0b",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  feedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  feedBadge: {
    borderRadius: 8,
    backgroundColor: "rgba(0,208,132,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 12,
  },
  feedBadgeText: {
    color: "#00d084",
    fontSize: 12,
    fontWeight: "700",
  },
  feedDetail: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  feedMeta: {
    color: "#9a9a9a",
    fontSize: 12,
    marginTop: 2,
  },
  amountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  amountCard: {
    width: "48%",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedAmountCard: {
    borderColor: "#00d084",
    backgroundColor: "rgba(0,208,132,0.1)",
  },
  amountText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedAmountText: {
    color: "#00d084",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedPaymentOption: {
    borderColor: "#00d084",
    backgroundColor: "rgba(0,208,132,0.1)",
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  paymentSubtitle: {
    color: "#aaaaaa",
    fontSize: 14,
  },
  recommendedBadge: {
    backgroundColor: "#00d084",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recommendedText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  savedMethod: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  primaryText: {
    color: "#00d084",
    fontSize: 12,
    fontWeight: "600",
  },
  addMethodButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#333333",
    borderStyle: "dashed",
  },
  addMethodText: {
    color: "#00d084",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    backgroundColor: "rgba(26,26,26,0.95)",
  },
  payButton: {
    backgroundColor: "#00d084",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentGatewayScreen;