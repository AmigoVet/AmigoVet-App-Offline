import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type User = {
  nombre: string;
  correo: string;
  telefono: string;
  userId: string;
};

interface AuthState {
  user: User | null;
  setUser: (user: User) => Promise<void>;
  loadUser: () => Promise<void>;
  clearUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: async (user: User) => {
    set((state) => ({ ...state, user })); // Actualiza solo el estado `user`
    await AsyncStorage.setItem('user', JSON.stringify(user)); // Guardar en AsyncStorage
  },
  loadUser: async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      set((state) => ({ ...state, user: JSON.parse(storedUser) })); // Restaurar desde AsyncStorage
    }
  },
  clearUser: async () => {
    set((state) => ({ ...state, user: null })); // Limpia solo el estado `user`
    await AsyncStorage.removeItem('user'); // Eliminar de AsyncStorage
  },
}));

export default useAuthStore;
