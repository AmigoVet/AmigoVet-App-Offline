import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../supabaseClient';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | undefined;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string[] | null;
  setUser: (user: User | null) => Promise<void>;
  loadUser: () => Promise<void>;
  clearUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: async (user: User | null) => {
    try {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem('user');
      }
      set({ user, error: null });
    } catch (error: any) {
      set({ error: [error.message || 'Failed to set user'] });
    }
  },

  loadUser: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw sessionError;
      }

      if (session?.user) {
        const user: User = {
          id: session.user.id,
          name: session.user.user_metadata.full_name || '',
          email: session.user.email || '',
          phone: undefined, // Not stored in auth.users
        };

        await AsyncStorage.setItem('user', JSON.stringify(user));
        set({ user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch (error: any) {
      set({ error: [error.message || 'Failed to load user'], loading: false });
    }
  },

  clearUser: async () => {
    try {
      await AsyncStorage.removeItem('user');
      set({ user: null, error: null });
    } catch (error: any) {
      set({ error: [error.message || 'Failed to clear user'] });
    }
  },

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      if (!data.user) {
        throw new Error('No user data returned');
      }

      const user: User = {
        id: data.user.id,
        name: data.user.user_metadata.full_name || '',
        email: data.user.email || '',
        phone: undefined, // Not stored in auth.users
      };

      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user, loading: false });
    } catch (error: any) {
      set({ error: [error.message || 'Login failed'], loading: false });
      throw error;
    }
  },

  register: async ({ name, email, phone, password, confirmPassword }) => {
    set({ loading: true, error: null });
    try {
      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (authError) {
        throw authError;
      }

      if (!data.user) {
        throw new Error('No user data returned');
      }

      const user: User = {
        id: data.user.id,
        name: data.user.user_metadata.full_name || name,
        email: data.user.email || email,
        phone: undefined, // Not stored in auth.users
      };

      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user, loading: false });
    } catch (error: any) {
      set({ error: [error.message || 'Registration failed'], loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      await AsyncStorage.removeItem('user');
      set({ user: null, loading: false });
    } catch (error: any) {
      set({ error: [error.message || 'Logout failed'], loading: false });
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'your-app://reset-password', // Replace with your app's deep link or web URL
      });
      if (error) {
        throw error;
      }
      set({ loading: false });
    } catch (error: any) {
      set({ error: [error.message || 'Failed to send password reset email'], loading: false });
      throw error;
    }
  },
}));