import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: any | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string[];
  register: (data: { name: string; email: string; phone: string; password: string; confirmPassword: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setError: (error: string[]) => void;
  initializeAuth: () => Promise<void>;
}

const API_BASE_URL = 'https://amigovet-monolitic.zeabur.app/auth';

export const useAuthStore = create<AuthState>((set) => ({
  // Inicio con supabase
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: [],
  setError: (error) => set({ error }),

  register: async ({ name, email, phone, password }) => {
    set({ loading: true, error: [] });
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, phone, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      set({ loading: false });
    } catch (error: any) {
      set({ loading: false, error: [error.message] });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: [] });
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const { user, token, refreshToken } = data;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      set({ user, token, refreshToken, loading: false });
    } catch (error: any) {
      set({ loading: false, error: [error.message] });
      throw error;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    set({ user: null, token: null, refreshToken: null, error: [] });
  },

  initializeAuth: async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (user && token) {
        set({ user: JSON.parse(user), token, refreshToken });
      }
    } catch (error: any) {
      set({ error: [error.message] });
    }
  },
}));
