import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { newColors } from '../../../styles/colors';
import { constants } from '../../../styles/constants';
import { supabase } from '../../../../supabaseClient';

interface SignUpForm {
  email: string;
  password: string;
  fullName: string;
}

const Feed = () => {
  const [form, setForm] = useState<SignUpForm>({ email: '', password: '', fullName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!form.email || !form.password) {
        throw new Error('Email y contraseña son obligatorios.');
      }

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.fullName },
        },
      });

      if (error) {
        throw error;
      }

      console.log('[SUCCESS] User created:', data);
      Alert.alert('Éxito', 'Usuario creado exitosamente. Revisa tu correo para verificar tu cuenta.');
      setForm({ email: '', password: '', fullName: '' });
    } catch (err: any) {
      console.error('[ERROR] Error creating user:', err.message || err);
      setError(err.message || 'No se pudo crear el usuario. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContainer>
      <Header title="Crear Usuario" />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Registro de Nuevo Usuario</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={newColors.fondo_secundario}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={newColors.fondo_secundario}
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor={newColors.fondo_secundario}
          value={form.fullName}
          onChangeText={(text) => setForm({ ...form, fullName: text })}
        />
        {loading ? (
          <ActivityIndicator size="large" color={newColors.verde_light} />
        ) : (
          <Button title="Crear Usuario" onPress={handleSignUp} />
        )}
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
    fontFamily: constants.FontTitle,
    marginBottom: 20,
  },
  input: {
    backgroundColor: newColors.fondo_principal,
    borderRadius: constants.borderRadius,
    padding: 15,
    marginBottom: 15,
    borderWidth: constants.borderWidth,
    borderColor: newColors.fondo_secundario,
    fontSize: 16,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
  },
  error: {
    fontSize: 16,
    color: newColors.rojo,
    fontFamily: constants.FontText,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Feed;
