import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ecoStats } from '../data/eco';

const EcoPointsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'rewards'>('overview');

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#009245', '#00c853']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
  <Text style={styles.headerTitle}>Eco Points</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['overview', 'achievements', 'rewards'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab as any)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Level Badge */}
        <View style={styles.levelBadge}>
          <MaterialCommunityIcons name="crown" size={24} color="#ffb300" />
          <Text style={styles.levelText}>{ecoStats.rank} - {ecoStats.level}</Text>
        </View>

        {/* Progress Text - NO PROGRESS BAR as specified */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Progress to {ecoStats.nextLevel}</Text>
          <Text style={styles.progressText}>
            {ecoStats.ecoPoints} pts → {ecoStats.nextThreshold} pts (-{ecoStats.nextThreshold - ecoStats.ecoPoints} pts)
          </Text>
        </View>

        {/* Stats Grid (2x2) */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#ff9800' }]}>
            <Text style={styles.statNumber}>{ecoStats.ecoPoints}</Text>
            <Text style={styles.statLabel}>Total Eco Points</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#00e676' }]}>
            <Text style={styles.statNumber}>{ecoStats.co2Saved}</Text>
            <Text style={styles.statLabel}>CO₂ Saved (kg)</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#2196f3' }]}>
            <Text style={styles.statNumber}>{ecoStats.greenRides}</Text>
            <Text style={styles.statLabel}>Green Rides</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#9c27b0' }]}>
            <Text style={styles.statNumber}>{ecoStats.dayStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View Achievements</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Claim Rewards</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0f0f0f' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginRight: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#00d084',
  },
  tabText: {
    color: '#aaaaaa',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 20,
  },
  levelText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressText: {
    color: '#aaaaaa',
    fontSize: 14,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  statNumber: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EcoPointsScreen;
