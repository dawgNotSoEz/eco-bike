import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const pages = [
  {
    title: 'Welcome to EcoCycle',
    subtitle: 'Pedal-only, sustainable mobility across SGT Campus',
  },
  {
    title: 'Reserve & Ride',
    subtitle: 'Book in advance, find nearby bikes and navigate easily',
  },
  {
    title: 'Earn Eco Points',
    subtitle: 'Ride green, earn points and climb the Eco Warrior leaderboard',
  },
];

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { finishOnboarding } = React.useContext(AuthContext);
  const scrollRef = useRef<ScrollView | null>(null);
  const [page, setPage] = useState(0);

  const handleNext = async () => {
    if (page < pages.length - 1) {
      scrollRef.current?.scrollTo({ x: (page + 1) * width, animated: true });
    } else {
      await finishOnboarding();
      navigation.reset({ index: 0, routes: [{ name: 'SignIn' as any }] });
    }
  };

  return (
    <LinearGradient colors={["#512da8", "#1976d2"]} style={styles.container}>
      <View style={styles.topRow}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / width))}
      >
        {pages.map((p, i) => (
          <View key={i} style={[styles.page, { width }] }>
            <Text style={styles.title}>{p.title}</Text>
            <Text style={styles.subtitle}>{p.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {pages.map((_, i) => (
            <View key={i} style={[styles.dot, page === i && styles.activeDot]} />
          ))}
        </View>

        <TouchableOpacity style={styles.cta} onPress={handleNext} activeOpacity={0.9}>
          <Text style={styles.ctaText}>{page === pages.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={async () => { await finishOnboarding(); navigation.reset({ index: 0, routes: [{ name: 'SignIn' as any }] }); }} style={styles.skip}>
          <Text style={styles.skipText}>Sign in instead</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topRow: { height: 110, justifyContent: 'center', paddingHorizontal: 20 },
  logo: { width: 88, height: 88, resizeMode: 'contain' },
  page: { justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 26, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#e6e6e6', fontSize: 16, marginTop: 12, textAlign: 'center', lineHeight: 22 },
  footer: { padding: 20, alignItems: 'center' },
  dots: { flexDirection: 'row', marginBottom: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.25)', marginHorizontal: 6 },
  activeDot: { backgroundColor: '#00d084', width: 18, borderRadius: 9 },
  cta: { backgroundColor: '#00d084', paddingVertical: 12, paddingHorizontal: 36, borderRadius: 10 },
  ctaText: { color: '#fff', fontWeight: '700' },
  skip: { marginTop: 12 },
  skipText: { color: 'rgba(255,255,255,0.8)' },
});

export default OnboardingScreen;
