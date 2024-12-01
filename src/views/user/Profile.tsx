import { View, Text, Button } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../assets/styles';
import useAuthStore from '../../assets/store/authStore';

const Profile = () => {
  const clearUser = useAuthStore((state) => state.clearUser); 

  const closeSession = async () => {
    await clearUser(); 
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Profile</Text>
      <Button title="Cerrar Sesión" onPress={closeSession} />
    </View>
  );
};

export default Profile;
