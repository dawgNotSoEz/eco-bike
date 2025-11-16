import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { wallet } from '../data/wallet';

export const PaymentGatewayScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedAmount, setSelectedAmount] = useState(200);
  const [selectedMethod, setSelectedMethod] = useState<string>('upi');

  const amounts = [100, 200, 500, 1000];

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
          style={styles.payButton}
          onPress={() => {
            // Handle payment
            navigation.goBack();
          }}
        >
          <Text style={styles.payButtonText}>Pay ₹{selectedAmount}</Text>
        </TouchableOpacity>
      </View>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
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