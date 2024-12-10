import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { Alert } from 'react-native';

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error('No se encontró un usuario autenticado.');
    }

    // Reautenticación
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Cambio de contraseña
    await updatePassword(user, newPassword);

    console.log('Contraseña cambiada correctamente.');
    Alert.alert('Contraseña cambiada correctamente.');
  } catch (error: any) {
    console.error('Error al cambiar la contraseña:', error);
    if (error.code === 'auth/wrong-password') {
        Alert.alert('La contraseña actual es incorrecta.');
    } else if (error.code === 'auth/weak-password') {
        Alert.alert('La nueva contraseña debe tener al menos 6 caracteres.');
    } else {
        Alert.alert('Ocurrió un error al cambiar la contraseña. Inténtalo nuevamente.');
    }
  }
};

