import React, { useMemo } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { QuickTool } from "../types/quickAccess";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  visible: boolean;
  onClose: () => void;
  tools: QuickTool[];
  onToolPress: (tool: QuickTool) => void;
}

export const QuickAccessModal: React.FC<Props> = ({ visible, onClose, tools, onToolPress }) => {
  const priorityTools = useMemo(
    () => tools.filter((tool) => ["scanner", "emergency", "booking"].includes(tool.category)),
    [tools]
  );
  const utilityTools = useMemo(
    () => tools.filter((tool) => !["scanner", "emergency", "booking"].includes(tool.category)),
    [tools]
  );

  const renderTile = (item: QuickTool) => (
    <TouchableOpacity
      key={item.id}
      style={styles.tile}
      onPress={() => onToolPress(item)}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={[item.color, `${item.color}cc`]}
        style={styles.tileIcon}
      >
        <MaterialCommunityIcons name={item.icon as any} size={22} color="#050505" />
      </LinearGradient>
      <Text style={styles.tileLabel}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.grabber} />
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Quick Access</Text>
              <Text style={styles.subtitle}>Instant actions to unlock, navigate or get help.</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.8}>
              <MaterialCommunityIcons name="close" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.statusStrip}>
            <MaterialCommunityIcons name="lightning-bolt" size={16} color="#00d084" />
            <Text style={styles.statusText}>Avg unlock 2 min • SOS response <Text style={{ fontWeight: "700" }}>under 30s</Text></Text>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
            <Text style={styles.sectionLabel}>Priority shortcuts</Text>
            <View style={styles.tilesGrid}>
              {priorityTools.map(renderTile)}
            </View>

            <Text style={[styles.sectionLabel, { marginTop: 18 }]}>Campus services</Text>
            <View style={styles.tilesGrid}>
              {utilityTools.map(renderTile)}
            </View>
          </ScrollView>
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
    backgroundColor: "#0b0b0b",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  grabber: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "center",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  subtitle: {
    color: "#b3b3b3",
    fontSize: 12,
    marginTop: 4,
  },
  statusStrip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,208,132,0.1)",
    borderRadius: 12,
    padding: 10,
    marginTop: 18,
  },
  statusText: {
    color: "#b5ffe0",
    marginLeft: 8,
    fontSize: 12,
  },
  sectionLabel: {
    color: "#9ea0a5",
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 24,
    marginBottom: 12,
  },
  tilesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tile: {
    width: "31%",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 14,
  },
  tileIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  tileLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
});

export default QuickAccessModal;
