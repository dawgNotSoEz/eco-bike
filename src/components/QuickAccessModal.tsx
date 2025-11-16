import React from "react";
import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { QuickTool } from "../types/quickAccess";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onClose: () => void;
  tools: QuickTool[];
  onToolPress: (tool: QuickTool) => void;
}

export const QuickAccessModal: React.FC<Props> = ({ visible, onClose, tools, onToolPress }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Quick Access – Instant actions & tools</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>Close</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={tools}
            keyExtractor={(i) => i.id.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.tile, { backgroundColor: item.color }]} onPress={() => onToolPress(item)}>
                <MaterialCommunityIcons name={item.icon as any} size={28} color="#fff" />
                <Text style={styles.tileLabel}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    backgroundColor: "#0f0f0f",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 1,
    borderColor: '#00d084',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  close: {
    color: "#aaa",
  },
  tile: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  tileLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
});

export default QuickAccessModal;
