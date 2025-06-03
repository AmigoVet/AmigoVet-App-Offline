import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import { newColors } from '../styles/colors';
import { constants } from '../styles/constants';

const WithLove = () => {
  return (
    <View style={styles.footer}>
        <Text style={styles.minitext}>Echo con </Text>
        <Icon name="heart" size={20} color={newColors.verde} />
        <Text style={styles.minitext}> por Juan Mera</Text>
    </View>
  );
};

const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      logoContainer: {
        alignItems: 'center',
      },
      footer: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      minitext: {
        color: newColors.fondo_secundario,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: constants.FontText,
      },
    });

export default WithLove;
