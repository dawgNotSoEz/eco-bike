import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient colors={["#4e00c2","#0076ff"]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
        <Text style={styles.title}>Create your account</Text>

        <View style={styles.form}>
          <TextInput placeholder="Full name" placeholderTextColor="#888" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Email" placeholderTextColor="#888" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
          <TextInput placeholder="Password" placeholderTextColor="#888" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
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
});

export default SignUpScreen;
