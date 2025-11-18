import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User as UserType } from '../types/user';

type StoredUser = UserType & { password: string };

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  onboardingComplete: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  finishOnboarding: () => Promise<void>;
  guestLogin: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const USERS_KEY = 'users_v1';
const CURRENT_USER_KEY = 'user';
const ONBOARDING_KEY = 'onboardingComplete';

// Seed user credentials for demo/testing
const seedDemoUser = async () => {
  try {
    const existing = await AsyncStorage.getItem(USERS_KEY);
    if (existing) return;

    const demo: StoredUser = {
      id: 'STU2024001',
      studentId: 'STU2024001',
      name: 'John Doe',
      email: 'john.doe@sgtuniversity.edu',
      phone: '+91 98765 43210',
      department: 'Computer Science',
      year: 'Junior',
      campus: 'SGT Campus',
      ridesToday: 3,
      totalRides: 127,
      isPremium: true,
      isVerified: true,
      password: 'Test@1234', // demo password
    };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([demo]));
  } catch (e) {
    // ignore
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await seedDemoUser();
        const u = await AsyncStorage.getItem(CURRENT_USER_KEY);
        const onb = await AsyncStorage.getItem(ONBOARDING_KEY);
        if (u) setUser(JSON.parse(u));
        if (onb === 'true') setOnboardingComplete(true);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const signIn = async (email: string, password: string) => {
    const usersRaw = await AsyncStorage.getItem(USERS_KEY);
    const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : [];
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { success: false, message: 'User not found' };
    if (found.password !== password) return { success: false, message: 'Invalid password' };

    const publicUser: UserType = { ...found } as UserType;
    delete (publicUser as any).password;
    setUser(publicUser);
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));
    return { success: true };
  };

  const signUp = async (name: string, email: string, password: string) => {
    const usersRaw = await AsyncStorage.getItem(USERS_KEY);
    const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : [];
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { success: false, message: 'Email already registered' };

    const id = 'STU' + Date.now().toString().slice(-6);
    const newUser: StoredUser = {
      id,
      studentId: id,
      name,
      email,
      phone: '+91 00000 00000',
      department: 'Unknown',
      year: 'Freshman',
      campus: 'SGT Campus',
      ridesToday: 0,
      totalRides: 0,
      isPremium: false,
      isVerified: false,
      password,
    };

    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

    const publicUser: UserType = { ...newUser } as UserType;
    delete (publicUser as any).password;
    setUser(publicUser);
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));

    return { success: true };
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  };

  const finishOnboarding = async () => {
    setOnboardingComplete(true);
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  };

  const guestLogin = async () => {
    const guestUser: UserType = {
      id: 'GUEST_' + Date.now(),
      studentId: 'GUEST',
      name: 'Guest User',
      email: 'guest@ecobike.local',
      phone: 'N/A',
      department: 'N/A',
      year: 'N/A',
      campus: 'SGT Campus',
      ridesToday: 0,
      totalRides: 0,
      isPremium: false,
      isVerified: false,
    };
    setUser(guestUser);
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(guestUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, onboardingComplete, signIn, signUp, signOut, finishOnboarding, guestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
