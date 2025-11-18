import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient colors={["#4e00c2","#0076ff"]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome back</Text>

        <View style={styles.form}>
          <TextInput placeholder="Email" placeholderTextColor="#888" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
          <TextInput placeholder="Password" placeholderTextColor="#888" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkipForNow}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ghost} onPress={() => navigation.navigate('SignUp' as any)}>
            <Text style={styles.ghostText}>Don't have an account? Create one</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 14, alignItems: 'center' }}>
            <Text style={{ color: '#e6f7ee' }}>Demo credentials:</Text>
            <Text style={{ color: '#e6f7ee', fontWeight: '700' }}>Email: john.doe@sgtuniversity.edu</Text>
            <Text style={{ color: '#e6f7ee', fontWeight: '700' }}>Password: Test@1234</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 120, height: 120, marginBottom: 24, resizeMode: 'contain' },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 8 },
  form: { width: '100%', marginTop: 12 },
  input: { backgroundColor: '#0f0f0f', color: '#fff', padding: 14, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00d084' },
  button: { backgroundColor: '#00d084', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 6 },
  buttonText: { color: '#042c22', fontWeight: '800' },
  skipButton: { backgroundColor: 'transparent', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: '#00d084' },
  skipButtonText: { color: '#00d084', fontWeight: '600' },
  ghost: { marginTop: 12, alignItems: 'center' },
  ghostText: { color: '#e6f7ee' },
});

export default SignInScreen;
