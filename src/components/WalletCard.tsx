import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Wallet } from "../types/wallet";

interface Props {
  wallet: Wallet;
  onPress?: () => void;
}

export const WalletCard: React.FC<Props> = ({ wallet, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <Text style={styles.label}>Wallet</Text>
      <Text style={styles.balance}>₹{wallet.balance.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#00d084",
    borderRadius: 14,
    padding: 16,
    marginRight: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    elevation: 3,
  },
  label: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    marginBottom: 8,
  },
  balance: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
});

export default WalletCard;
