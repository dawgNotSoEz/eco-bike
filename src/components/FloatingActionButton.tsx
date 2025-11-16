import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
}

export const FloatingActionButton: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <MaterialCommunityIcons name="bike" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    bottom: 70,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#00d084",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    elevation: 6,
  },
});

export default FloatingActionButton;
