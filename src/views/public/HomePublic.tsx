import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { getDynamicColors, newColors } from '../../assets/styles/colors';
import { FromDevora } from '../../components/global';

const HomePublic = () => {

  return (
    <View style={[styles.container, { backgroundColor: newColors.fondo_principal }]}>
      <Text style={[styles.title, { color: newColors.verde_light }]}>¡Llegara Pronto!</Text>
      <Text style={[styles.description, { color: newColors.fondo_secundario }]}>
        Estamos trabajando para traerte una nueva sección donde podrás ver y publicar tus animales tanto para venta como para adopción.
      </Text>
      <View style={[styles.divider, { backgroundColor: newColors.fondo_secundario }]} />
      <Text style={[styles.footerText, { color: newColors.fondo_secundario }]}>
        Mantente atento para más actualizaciones.
      </Text>
      <Text  style={[styles.footerText, { color: newColors.fondo_secundario }]}>AmigoVet Store</Text>
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
