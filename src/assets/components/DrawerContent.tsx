import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import CustomIcon from './CustomIcon';
import useAuthStore from '../store/authStore';

export const DrawerContent = (props: any) => {
  const { user } = useAuthStore();
  const [isDark, setIsDark] = React.useState(false);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Imagen */}
      <View>
        <Image
          source={require('../../assets/img/HeaderLogo1.png')}
          style={{
            alignSelf: 'center',
            width: '90%',
            margin: 0,
            marginVertical: -20,
          }}
          resizeMode="contain"
        />
      </View>

      {/* Información del usuario */}
      <View style={styles.userInfo}>
        <View>
          <Image
            source={require('../../assets/img/veterinario.png')}
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={styles.userName}>{user?.nombre || 'Usuario Anónimo'}</Text>
          <Text style={styles.userName}>{user?.correo || 'Correo No Encontrado'}</Text>
          <Text style={styles.userName}>+57 {user?.telefono || 'Telefono No Encontrado'}</Text>
        </View>
      </View>

      {/* Opciones de navegación del drawer */}
      <View style={{ flexGrow: 1 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable onPress={() => setIsDark(!isDark)}>
          <CustomIcon name="exit-outline" size={30} color={colors.rojo} />
        </Pressable>
        <Pressable onPress={() => setIsDark(!isDark)}>
          <CustomIcon
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={30}
            color="white"
          />
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondoDark,
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    borderColor: colors.naranja,
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
    color: colors.blanco,
    fontSize: 16,
  },
  footer: {
    height: 50,
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
