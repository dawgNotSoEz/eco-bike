import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { currentUser } from '../data/user';
import { useNavigation } from '@react-navigation/native';
import { ecoStats } from '../data/eco';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <LinearGradient
          colors={['#4e00c2', '#7e57c2']}
          style={styles.profileCard}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(currentUser.name)}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{currentUser.name}</Text>
              <Text style={styles.studentId}>Student ID: {currentUser.studentId}</Text>
              <View style={styles.badges}>
                {currentUser.isPremium && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Premium Member</Text>
                  </View>
                )}
                {currentUser.isVerified && (
                  <View style={[styles.badge, { backgroundColor: '#00e676' }]}>
                    <Text style={styles.badgeText}>Verified</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={{marginHorizontal:20, marginTop:12}}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={{backgroundColor:'#1a1a1a', padding:12, borderRadius:8, alignItems:'center'}}>
            <Text style={{color:'#fff'}}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#00d084' }]}>
            <Text style={styles.statNumber}>{currentUser.totalRides}</Text>
            <Text style={styles.statLabel}>Total Rides</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#2196f3' }]}>
            <Text style={styles.statNumber}>{ecoStats.ecoPoints}</Text>
            <Text style={styles.statLabel}>Eco Points</Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="email" size={20} color="#aaaaaa" />
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{currentUser.email}</Text>
          </View>

          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="phone" size={20} color="#aaaaaa" />
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{currentUser.phone}</Text>
          </View>

          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="school" size={20} color="#aaaaaa" />
            <Text style={styles.infoLabel}>Department</Text>
            <Text style={styles.infoValue}>{currentUser.department}</Text>
          </View>

          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="calendar" size={20} color="#aaaaaa" />
            <Text style={styles.infoLabel}>Year</Text>
            <Text style={styles.infoValue}>{currentUser.year}</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityItem}>
            <MaterialCommunityIcons name="bike" size={20} color="#00d084" />
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Completed ride (Library to Engineering)</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <MaterialCommunityIcons name="star" size={20} color="#ffc107" />
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Earned 50 points</Text>
              <Text style={styles.activityTime}>3 hours ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <MaterialCommunityIcons name="trophy" size={20} color="#ff9800" />
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Joined challenge</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
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
  profileCard: {
    marginHorizontal: 20,
    marginTop: 50,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  studentId: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginBottom: 8,
  },
  badges: {
    flexDirection: "row",
  },
  badge: {
    backgroundColor: "#ff9800",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    marginRight: 10,
    alignItems: "center",
  },
  statNumber: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
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
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  infoLabel: {
    color: "#aaaaaa",
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  infoValue: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  activityInfo: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  activityTime: {
    color: "#aaaaaa",
    fontSize: 12,
  },
});

export default ProfileScreen;
