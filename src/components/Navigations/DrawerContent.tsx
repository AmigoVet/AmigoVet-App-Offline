import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  Dimensions,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { getDynamicColors } from '../../assets/styles/colors';
import { formatPhoneNumber } from '../../lib/functions/FormaterNumberPhone';
import useAuthStore from '../../lib/store/authStore';
import { CustomIcon } from '../Customs';
import { useTheme } from '../../lib/context/ThemeContext';


export const DrawerContent = (props: any) => {
  const { user } = useAuthStore();
  const { isDarkTheme, toggleTheme } = useTheme(); 
  const colors = getDynamicColors(isDarkTheme); 
  const { width} = Dimensions.get('window');
  const styles = dymanycStyles(colors, width);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.container, { backgroundColor: colors.fondo }]}>
      {/* Imagen */}
      <View>
        <Image
          source={require('../../assets/img/HeaderLogo.png')}
          style={{
            alignSelf: 'center',
            width: '90%',
            height: width*0.3,
          }}
          resizeMode="contain"
        />
      </View>

      {/* Información del usuario */}
      <View style={[styles.userInfo, { borderColor: colors.verde }]}>
        <View>
          <Image
            source={require('../../assets/img/veterinario.png')}
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={[styles.userName, { color: colors.blanco }]}>{user?.nombre || 'Usuario Anónimo'}</Text>
          <Text style={[styles.userName, { color: colors.blanco }]}>{user?.correo || 'Correo No Encontrado'}</Text>
          <Text style={[styles.userName, { color: colors.blanco }]}>
            +57 {formatPhoneNumber(user!.telefono) || 'Telefono No Encontrado'}
          </Text>
        </View>
      </View>

      {/* Opciones de navegación del drawer */}
      <View style={{ flexGrow: 1 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable onPress={toggleTheme}>
          <CustomIcon
            name={isDarkTheme ? 'sunny-outline' : 'moon-outline'}
            size={30}
            color={isDarkTheme ? colors.naranja : colors.verde}
          />
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

const dymanycStyles = (colors: ReturnType<typeof getDynamicColors>, widht: number) =>
  StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: widht * 0.035,
  },
  footer: {
    height: 50,
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
