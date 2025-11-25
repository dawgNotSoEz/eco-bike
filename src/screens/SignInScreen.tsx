import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();
  const { signIn, guestLogin } = React.useContext(AuthContext);

  const handleSignIn = async () => {
    const res = await signIn(email.trim(), password);
    if (!res.success) {
      Alert.alert('Sign in failed', res.message || 'Invalid credentials');
      return;
    }
    navigation.reset({ index: 0, routes: [{ name: 'Main' as any }] });
  };

  const handleSkipForNow = async () => {
    await guestLogin();
    navigation.reset({ index: 0, routes: [{ name: 'Main' as any }] });
  };

  return (
    <LinearGradient colors={["#050505","#171717"]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
          <View>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to unlock rides, rewards, and live navigation.</Text>
          </View>
        </View>

        <View style={styles.pillRow}>
          {['Secure access', 'One tap reserve', 'Eco leaderboard'].map(pill => (
            <View key={pill} style={styles.pill}>
              <Text style={styles.pillText}>{pill}</Text>
            </View>
          ))}
        </View>

        <View style={styles.formCard}>
          <View style={styles.formField}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#7ef7c7" />
            <TextInput
              placeholder="Campus email"
              placeholderTextColor="#777"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formField}>
            <MaterialCommunityIcons name="lock-outline" size={20} color="#7ef7c7" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#777"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.primaryCta} onPress={handleSignIn} activeOpacity={0.9}>
            <LinearGradient colors={["#00d084", "#00a86b"]} style={styles.ctaGradient}>
              <Text style={styles.buttonText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkipForNow}>
            <Text style={styles.skipButtonText}>Continue as guest</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ghost} onPress={() => navigation.navigate('SignUp' as any)}>
            <Text style={styles.ghostText}>Don’t have an account? Create one</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.demoCard}>
          <Text style={styles.demoLabel}>Demo credentials</Text>
          <Text style={styles.demoValue}>john.doe@sgtuniversity.edu</Text>
          <Text style={styles.demoValue}>Test@1234</Text>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 24 },
  logo: { width: 84, height: 84, marginBottom: 14, resizeMode: 'contain' },
  title: { color: '#fff', fontSize: 26, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#b5b5b5', fontSize: 14, textAlign: 'center', marginTop: 6 },
  pillRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  pill: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: 4, paddingVertical: 10, borderRadius: 999, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  pillText: { color: '#9de7c4', fontSize: 12, fontWeight: '600' },
  formCard: { backgroundColor: '#101010', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  formField: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 12, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  input: { flex: 1, color: '#fff', paddingVertical: 12, marginLeft: 10 },
  primaryCta: { marginTop: 4 },
  ctaGradient: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#041c14', fontWeight: '800' },
  skipButton: { backgroundColor: 'transparent', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  skipButtonText: { color: '#8be6bf', fontWeight: '600' },
  ghost: { marginTop: 12, alignItems: 'center' },
  ghostText: { color: '#e6f7ee', fontSize: 13 },
  demoCard: { marginTop: 18, backgroundColor: 'rgba(0,208,132,0.08)', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: 'rgba(0,208,132,0.3)' },
  demoLabel: { color: '#8ae9c0', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  demoValue: { color: '#fff', fontWeight: '700', marginTop: 4 },
});

export default SignInScreen;
