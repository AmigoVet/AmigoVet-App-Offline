import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { newColors } from '../styles/colors';

interface GlobalContainerProps {
  children: React.ReactNode;
}

const GlobalContainer = ({ children }: GlobalContainerProps) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(newColors.fondo_secundario);
      StatusBar.setTranslucent(false);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.fullScreenContainer}>
        <StatusBar
          backgroundColor={newColors.fondo_secundario}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        />
        <SafeAreaView style={styles.safeAreaContainer}>
          {children}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: newColors.fondo_secundario,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: newColors.fondo_principal,
  },
});

export default GlobalContainer;