import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { getDynamicColors, staticColors } from '../../assets/styles/colors';
import { useTheme } from '../../lib/context/ThemeContext';

const FromDevora = () => {

  const {isDarkTheme} = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = dymanycStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>BY Devora Inc</Text>
    </View>
  );
};

const dymanycStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
  container: {
    position: 'absolute', 
    bottom: 20, 
    left: 0,
    right: 0, 
    alignItems: 'center', 
  },
  text: {
    fontSize: 13,
    fontWeight: 300,
    color: colors.blanco,
  },
});

export default FromDevora;
