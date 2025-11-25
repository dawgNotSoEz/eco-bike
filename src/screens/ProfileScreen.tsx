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
  const progressPercent = Math.min(100, Math.round((ecoStats.ecoPoints / ecoStats.nextThreshold) * 100));

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

        <View style={styles.quickActions}>
          {[
            { label: 'Edit Profile', icon: 'account-edit', route: 'SignUp' },
            { label: 'Wallet', icon: 'wallet', route: 'Wallet' },
            { label: 'Support', icon: 'lifebuoy', route: 'HelpSupport' },
          ].map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.quickAction}
              onPress={() => navigation.navigate(action.route as never)}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons name={action.icon as any} size={20} color="#00d084" />
              <Text style={styles.quickActionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Eco Progress</Text>
              <Text style={styles.progressSubtitle}>{ecoStats.level} • {ecoStats.rank}</Text>
            </View>
            <Text style={styles.progressMetric}>{ecoStats.ecoPoints} pts</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressHint}>
            {ecoStats.nextThreshold - ecoStats.ecoPoints} pts to {ecoStats.nextLevel}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn' as never)}
          style={styles.signOutButton}
          activeOpacity={0.85}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#00d084' }]}>
            <MaterialCommunityIcons name="bike-fast" size={24} color="#0f0f0f" />
            <View>
              <Text style={styles.statNumber}>{currentUser.totalRides}</Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#2196f3' }]}>
            <MaterialCommunityIcons name="leaf" size={24} color="#0f0f0f" />
            <View>
              <Text style={styles.statNumber}>{ecoStats.ecoPoints}</Text>
              <Text style={styles.statLabel}>Eco Points</Text>
            </View>
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
          
          {[
            { icon: 'bike', color: '#00d084', title: 'Completed ride (Library → Engineering)', time: '2 hours ago' },
            { icon: 'star', color: '#ffc107', title: 'Earned 50 points', time: '3 hours ago' },
            { icon: 'trophy', color: '#ff9800', title: 'Joined sustainability challenge', time: '1 day ago' },
          ].map(activity => (
            <View key={activity.title} style={styles.activityItem}>
              <MaterialCommunityIcons name={activity.icon as any} size={20} color={activity.color} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 12,
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#121212',
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  quickActionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  signOutButton: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: '#262626',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  signOutText: {
    color: '#ffffff',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  progressCard: {
    backgroundColor: '#121212',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  progressSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  progressMetric: {
    color: '#00d084',
    fontSize: 20,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#1f1f1f',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00d084',
    borderRadius: 4,
  },
  progressHint: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
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
