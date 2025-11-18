import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import MapSection from "../components/MapSection";
import WalletCard from "../components/WalletCard";
import RidesCard from "../components/RidesCard";
import EcoImpactCard from "../components/EcoImpactCard";
import BookingCard from "../components/BookingCard";
import StationItem from "../components/StationItem";
import UpdateItem from "../components/UpdateItem";
import FloatingActionButton from "../components/FloatingActionButton";
import QuickAccessModal from "../components/QuickAccessModal";

import { stations } from "../data/stations";
import { updates } from "../data/updates";
import { quickTools } from "../data/quickAccess";
import { wallet } from "../data/wallet";
import { ecoStats } from "../data/eco";
import { currentUser } from "../data/user";
import { AuthContext } from "../context/AuthContext";

import { useNavigation } from "@react-navigation/native";

export const HomeScreen: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigation = useNavigation<any>();
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#00ff77" />
      </View>
    );
  }
  
  const displayUser = user || currentUser;

  const handleTool = (t: any) => {
    // map tool categories to screens
    if (t.category === 'scanner') return navigation.navigate('QRScanner' as any);
    if (t.category === 'emergency') return navigation.navigate('EmergencySOS' as any);
    if (t.category === 'booking') return navigation.navigate('SelectBike' as any);
  if (t.title === 'Eco Points') return navigation.navigate('EcoPoints' as any);
    if (t.title === 'Support') return navigation.navigate('HelpSupport' as any);
    if (t.title === 'Report Issue') return navigation.navigate('ReportIssue' as any);
    if (t.title === 'History') return navigation.navigate('RideHistory' as any);
  };

  return (
    <View style={styles.container}>
      <Header campus={displayUser.campus} />

      <FlatList
        data={stations}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => <StationItem station={item} onPress={() => navigation.navigate("StationDetails" as any, { stationId: item.id })} />}
        ListHeaderComponent={() => (
          <View style={{ padding: 12 }}>
            <MapSection />

            <View style={styles.row}>
              <WalletCard wallet={wallet} onPress={() => navigation.navigate("Wallet" as any)} />
              <RidesCard ridesToday={displayUser.ridesToday} onPress={() => {}} />
            </View>

            <EcoImpactCard eco={ecoStats} onViewAll={() => navigation.navigate('EcoPoints' as any)} />

            <BookingCard onPress={() => navigation.navigate('SelectBike' as any)} />

            <Text style={styles.sectionTitle}>Bike Stations <Text style={styles.pill}>5 Active Stations</Text></Text>

            <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Campus Updates</Text>
            {updates.map((u) => (
              <UpdateItem key={u.id} update={u} />
            ))}

            <View style={{ height: 12 }} />
          </View>
        )}
        ListFooterComponent={() => <View style={{ height: 120 }} />}
      />

      <FloatingActionButton onPress={() => setModalOpen(true)} />

      <QuickAccessModal visible={modalOpen} onClose={() => setModalOpen(false)} tools={quickTools} onToolPress={(t) => { setModalOpen(false); handleTool(t); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  row: {
    flexDirection: "row",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 8,
  },
  pill: {
    fontSize: 12,
    color: "#00d084",
    fontWeight: "700",
  },
});

export default HomeScreen;
