import { View, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { newColors } from '../../styles/colors';

interface CustomScrollViewProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CustomScrollView = ({children, scrollEnabled, style}: CustomScrollViewProps) => {
  return (
    <ScrollView
        style={[style]}
        contentContainerStyle={{ backgroundColor: newColors.fondo_secundario }}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
    >
        <View style={{ flex: 1, backgroundColor: newColors.fondo_principal }}>
            {children}
        </View>
    </ScrollView>
  );
};

export default CustomScrollView;
