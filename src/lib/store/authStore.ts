import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../interfaces/User';

// Function to generate a simple random ID
const generateRandomId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Definimos la interfaz para el estado del store
interface AuthState {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

// Creamos el store con Zustand y persist middleware
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (userData: User) => {
        try {
          const userWithId = { ...userData, id: generateRandomId() };
          set({ user: userWithId });
        } catch (error) {
          console.error('Error during login:', error);
          throw error; // Re-throw to handle in UI
        }
      },
      logout: async () => {
        try {
          set({ user: null });
        } catch (error) {
          console.error('Error during logout:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage', // Nombre clave para AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Usamos AsyncStorage como almacenamiento
    }
  )
);