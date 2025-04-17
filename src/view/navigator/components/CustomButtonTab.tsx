// CustomButtonTab.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

// Simplificado para este ejemplo
const CustomButtonTab = (props: any) => {
  const { route, children, accessibilityState, onPress } = props;
  const isSelected = accessibilityState.selected;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        styles.tabButton,
        isSelected ? styles.activeTabButton : styles.inactiveTabButton,
      ]}
    >
      <View>
        {children}
        {isSelected && <View style={styles.indicator} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: '#f0f0f0',
  },
  inactiveTabButton: {
    backgroundColor: '#ffffff',
  },
  indicator: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#3498db',
    marginTop: 4,
  },
});

export default CustomButtonTab;