import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const pages = [
  {
    title: 'Ride Greener',
    subtitle: 'Discover pedal-only routes, curated hotspots and campus highlights.',
    badge: '01',
    icon: 'leaf-maple',
  },
  {
    title: 'Instant Unlocks',
    subtitle: 'Reserve in seconds, follow guided navigation and never lose your ride.',
    badge: '02',
    icon: 'lightning-bolt',
  },
  {
    title: 'Earn Eco Points',
    subtitle: 'Track streaks, unlock premium rewards and rank up as Eco Warrior.',
    badge: '03',
    icon: 'trophy-outline',
  },
];

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { finishOnboarding } = React.useContext(AuthContext);
  const scrollRef = useRef<ScrollView | null>(null);
  const [page, setPage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = async () => {
    if (page < pages.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.4, duration: 150, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
      scrollRef.current?.scrollTo({ x: (page + 1) * width, animated: true });
    } else {
      await finishOnboarding();
      navigation.reset({ index: 0, routes: [{ name: 'SignIn' as any }] });
    }
  };

  return (
    <LinearGradient colors={["#050505", "#1a1a1a"]} style={styles.container}>
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
            <Animated.View style={[styles.badge, { opacity: page === i ? fadeAnim : 0.4 }]}>
              <Text style={styles.badgeText}>{p.badge}</Text>
            </Animated.View>
            <View style={styles.illustrationShell}>
              <MaterialCommunityIcons name={p.icon as any} size={120} color="#00d084" />
              <LinearGradient colors={["rgba(0,208,132,0.25)", "transparent"]} style={styles.glow} />
            </View>
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
          <LinearGradient colors={["#00d084", "#00b56f"]} style={styles.ctaGradient}>
            <Text style={styles.ctaText}>{page === pages.length - 1 ? 'Get Started' : 'Next'}</Text>
          </LinearGradient>
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
  illustrationShell: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  illustration: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  glow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  badge: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 18,
  },
  badgeText: {
    color: '#00d084',
    fontWeight: '600',
    letterSpacing: 1,
  },
  title: { color: '#fff', fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: '#cfcfcf', fontSize: 16, textAlign: 'center', lineHeight: 22 },
  footer: { padding: 20, alignItems: 'center' },
  dots: { flexDirection: 'row', marginBottom: 16 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 6 },
  activeDot: { backgroundColor: '#00d084', width: 22, borderRadius: 3 },
  cta: { width: '100%' },
  ctaGradient: { borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  ctaText: { color: '#fff', fontWeight: '700', letterSpacing: 0.5 },
  skip: { marginTop: 14 },
  skipText: { color: 'rgba(255,255,255,0.6)' },
});

export default OnboardingScreen;
