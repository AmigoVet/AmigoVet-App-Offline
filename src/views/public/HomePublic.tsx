import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';
import { FromDevora } from '../../components/global';

const HomePublic = () => {
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);

  return (
    <View style={[styles.container, { backgroundColor: colors.fondo }]}>
      <Text style={[styles.title, { color: colors.verdeLight }]}>¡Llegara Pronto!</Text>
      <Text style={[styles.description, { color: colors.blanco }]}>
        Estamos trabajando para traerte una nueva sección donde podrás ver y publicar tus animales tanto para venta como para adopción.
      </Text>
      <View style={[styles.divider, { backgroundColor: colors.blanco }]} />
      <Text style={[styles.footerText, { color: colors.blanco }]}>
        Mantente atento para más actualizaciones.
      </Text>
      <Text  style={[styles.footerText, { color: colors.blancoLight }]}>AmigoVet Store</Text>
      <FromDevora />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  divider: {
    width: '80%',
    height: 1,
    marginVertical: 20,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomePublic;
