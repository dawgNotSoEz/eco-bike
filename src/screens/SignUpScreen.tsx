import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SignUpScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const handleSignUp = async () => {
    const res = await signUp(name.trim(), email.trim(), password);
    if (!res.success) {
      Alert.alert('Sign up failed', res.message || 'Cannot create account');
      return;
    }
    navigation.reset({ index: 0, routes: [{ name: 'Main' as any }] });
  };

  return (
    <LinearGradient colors={["#050505","#1c1c1c"]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
          <View>
            <Text style={styles.title}>Create your Eco ID</Text>
            <Text style={styles.subtitle}>Track your rides, compete on leaderboards and redeem campus perks.</Text>
          </View>
        </View>

        <View style={styles.stepsRow}>
          {['Account', 'Verify', 'Ride'].map((label, index) => (
            <View key={label} style={styles.step}>
              <View style={[styles.stepBadge, index === 0 && styles.activeStep]}>
                <Text style={styles.stepBadgeText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepLabel}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.formCard}>
          <View style={styles.formField}>
            <MaterialCommunityIcons name="account-outline" size={20} color="#7ef7c7" />
            <TextInput placeholder="Full name" placeholderTextColor="#777" value={name} onChangeText={setName} style={styles.input} />
          </View>
          <View style={styles.formField}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#7ef7c7" />
            <TextInput placeholder="Campus email" placeholderTextColor="#777" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
          </View>
          <View style={styles.formField}>
            <MaterialCommunityIcons name="lock-check-outline" size={20} color="#7ef7c7" />
            <TextInput placeholder="Password" placeholderTextColor="#777" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
          </View>

          <Text style={styles.hint}>Use your official SGT email so we can verify your rides instantly.</Text>

          <TouchableOpacity style={styles.primaryCta} onPress={handleSignUp} activeOpacity={0.9}>
            <LinearGradient colors={["#00d084", "#00a86b"]} style={styles.ctaGradient}>
              <Text style={styles.buttonText}>Create account</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchCta} onPress={() => navigation.navigate('SignIn' as any)}>
            <Text style={styles.switchText}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center' },
  logo: { width: 84, height: 84, marginBottom: 12, resizeMode: 'contain' },
  title: { color: '#fff', fontSize: 26, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#b5b5b5', fontSize: 14, textAlign: 'center', marginTop: 6, lineHeight: 20 },
  stepsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 26, marginBottom: 20 },
  step: { alignItems: 'center', flex: 1 },
  stepBadge: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  stepBadgeText: { color: '#8be6bf', fontWeight: '700' },
  activeStep: { backgroundColor: 'rgba(0,208,132,0.15)', borderColor: '#00d084' },
  stepLabel: { color: '#888', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  formCard: { backgroundColor: '#101010', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  formField: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 12, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  input: { flex: 1, color: '#fff', paddingVertical: 12, marginLeft: 10 },
  hint: { color: '#9de7c4', fontSize: 12, marginTop: 4 },
  primaryCta: { marginTop: 18 },
  ctaGradient: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#041c14', fontWeight: '800' },
  switchCta: { marginTop: 16, alignItems: 'center' },
  switchText: { color: '#e6f7ee', fontSize: 13 },
});

export default SignUpScreen;
