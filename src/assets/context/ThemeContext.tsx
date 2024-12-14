import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define la estructura del contexto para TypeScript
interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

// Crea el contexto con un valor predeterminado vacío
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Carga la preferencia del usuario desde AsyncStorage
  useEffect(() => {
    const loadThemePreference = async () => {
      const storedTheme = await AsyncStorage.getItem('themePreference');
      if (storedTheme !== null) {
        setIsDarkTheme(storedTheme === 'dark');
      }
    };
    loadThemePreference();
  }, []);

  // Cambia y guarda la preferencia en AsyncStorage
  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    await AsyncStorage.setItem('themePreference', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
};
