import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useTheme } from '../../lib/context/';
import { getDynamicColors } from '../../assets/styles/colors';

const LoaderScreen = () => {
    const { isDarkTheme } = useTheme();
    const colors = getDynamicColors(isDarkTheme);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.verde} />
    </View>
  )
}

export default LoaderScreen