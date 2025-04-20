import { View, StyleSheet, StatusBar, Platform, StyleProp, ViewStyle } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { newColors } from '../styles/colors';

interface GlobalContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const GlobalContainer = ({ children, style }: GlobalContainerProps) => {
  const insets = useSafeAreaInsets();
  
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(newColors.fondo_secundario);
      StatusBar.setTranslucent(false);
    }
  }, []);

  return (
    <SafeAreaProvider>
      {/* Este View exterior siempre tendrá el color fondo_secundario y cubrirá toda la pantalla */}
      <View style={styles.fullScreenContainer}>
        <StatusBar
          backgroundColor={newColors.fondo_secundario}
          barStyle="light-content"
        />
        
        {/* En iOS, en lugar de usar SafeAreaView, manejamos manualmente los insets */}
        {Platform.OS === 'ios' ? (
          <View style={[styles.iosContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={[styles.contentContainer, style]}>
              {children}
            </View>
          </View>
        ) : (
          <SafeAreaView style={[styles.safeAreaContainer, style]}>
            {children}
          </SafeAreaView>
        )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: newColors.fondo_secundario, // Siempre fondo_secundario para toda la pantalla
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: newColors.fondo_principal, // Para Android
  },
  iosContainer: {
    flex: 1,
    backgroundColor: newColors.fondo_secundario, // Mantiene el color en las áreas no seguras
  },
  contentContainer: {
    flex: 1,
    backgroundColor: newColors.fondo_principal, // El contenido tendrá fondo_principal
  }
});

export default GlobalContainer;