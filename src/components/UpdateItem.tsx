import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CampusUpdate } from "../types/update";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

interface Props {
  update: CampusUpdate;
}

export const UpdateItem: React.FC<Props> = ({ update }) => {
  const renderIcon = () => {
    switch (update.icon) {
      case "leaf":
        return <MaterialCommunityIcons name="leaf" size={20} color={update.iconColor} />;
      case "bus":
        return <MaterialCommunityIcons name="bus" size={20} color={update.iconColor} />;
      case "medal":
        return <MaterialCommunityIcons name="medal" size={20} color={update.iconColor} />;
      default:
        return <Feather name="info" size={20} color="#fff" />;
    }
  };

  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>{renderIcon()}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{update.title}</Text>
        <Text style={styles.subtitle}>{update.subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#00d084',
  },
  iconWrap: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  subtitle: {
    color: "#cfcfcf",
    fontSize: 12,
  },
});

export default UpdateItem;
