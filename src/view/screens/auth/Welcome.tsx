import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigator/navigationTypes';
import CustomButton from '../../components/customs/CustomButton';
import GlobalContainer from '../../components/GlobalContainer';
import { newColors } from '../../styles/colors';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

const Welcome = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <GlobalContainer>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bienvenido a AmigoVet</Text>
        <Text style={styles.subtitle}>Bienvenido a AmigoVet</Text>
        <CustomButton
          text="Ir a Registro"
          onPress={() => navigation.navigate('Register')}
          backgroundColor={newColors.fondo_secundario}
        />
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
    fontFamily: 'Chillax',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Synonym-Regular',
  },
});

export default Welcome;