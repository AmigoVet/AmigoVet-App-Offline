import React, { useState, useMemo } from 'react';
import { Text, Alert, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../../../navigator/navigationTypes';
import { Register } from '../../../../../lib/interfaces/Register';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import CustomButton from '../../../../components/customs/CustomButton';
import Separator from '../../../../components/Separator';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import CustomScrollView from '../../../../components/customs/CustomScrollView';
import GlobalContainer from '../../../../components/GlobalContainer';
import Header from '../../../../components/Header';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import DatePickerSection from './DatePickerSection';
import { validateRegisterInputs } from './registerEvents';
import { v4 as uuidv4 } from 'uuid';
import CustomInput from '../../../../components/customs/CustomImput';
import MiniButton from '../../../../components/MiniButton';
import { calculatePartoDate } from '../../../../../lib/functions/calculatePartoDate';
import { Especie } from '../../../../../lib/interfaces/Animal';
import { sendNotifi } from '../../../../../lib/interfaces/Events';
import { notificationUtils } from '../../../../../lib/utils/notifi/notificationUtils';
import { calculateNotificationDate } from '../../../../../lib/utils/notifi/calculateNotificacionDate';

type CreateRegisterFormRouteProp = RouteProp<RootStackParamList, 'CreateRegisterForm'>;

interface FormData {
  comentario: string;
  accion: string;
  frecuencia: string;
  repeticiones: string;
  registerDate: Date;
  notificationOffset: sendNotifi;
}

const NOTIFICATION_OFFSETS: { label: string; value: sendNotifi }[] = [
  { label: '1 día antes', value: '1d' },
  { label: '2 días antes', value: '2d' },
  { label: '3 días antes', value: '3d' },
  { label: '4 días antes', value: '4d' },
  { label: '5 días antes', value: '5d' },
  { label: '1 semana antes', value: '1w' },
  { label: '2 semanas antes', value: '2w' },
];

const CreateRegisterForm: React.FC = () => {
  const route = useRoute<CreateRegisterFormRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { animal } = route.params || {};
  const { addRegister, addEvent, deleteEvent, updateAnimalPregnancy, animals } = useAnimalStore();

  const [formData, setFormData] = useState<FormData>({
    comentario: '',
    accion: '',
    frecuencia: '1',
    repeticiones: '1',
    registerDate: new Date(),
    notificationOffset: '1d',
  });
  const [isSaving, setIsSaving] = useState(false);

  const acciones = useMemo(
    () =>
      animal?.genero === 'Hembra'
        ? animal.embarazada
          ? ['Aborto', 'Tratamiento']
          : ['Embarazo', 'Inseminación', 'Tratamiento']
        : ['Tratamiento'],
    [animal?.genero, animal?.embarazada]
  );

  if (!animal) {
    return (
      <GlobalContainer>
        <Header
          title="Agregar Registro"
          iconOnPress="chevron-back-outline"
          onPress={() => navigation.goBack()}
        />
        <View style={GlobalStyles.padding20}>
          <Text style={styles.errorText}>Error: No se proporcionó información del animal</Text>
        </View>
      </GlobalContainer>
    );
  }

  if (!formData.accion && acciones.length > 0) {
    setFormData((prev) => ({ ...prev, accion: acciones[0] }));
  }


  const handleSaveRegister = async () => {
    const validationError = validateRegisterInputs({
      comentario: formData.comentario,
      accion: formData.accion,
      frecuencia: formData.frecuencia,
      repeticiones: formData.repeticiones,
      registerDate: formData.registerDate,
      animal,
    });
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }

    setIsSaving(true);
    const registerData: Register = {
      id: uuidv4(),
      animalId: animal.id,
      comentario: formData.comentario.trim(),
      accion: formData.accion,
      fecha: formData.registerDate.toISOString().split('T')[0],
    };

    let notificationsSkipped = false;

    try {
      await addRegister(registerData);

      if (formData.accion === 'Embarazo' || formData.accion === 'Inseminación') {
        const partoDate = calculatePartoDate(formData.registerDate, animal.especie as Especie);
        const notifiDate = calculateNotificationDate(partoDate, formData.notificationOffset);
        if (notifiDate.getTime() <= new Date().getTime()) {
          notificationsSkipped = true;
        } else {
          const eventData = {
            id: uuidv4(),
            animalId: animal.id,
            animalName: animal.nombre,
            comentario: `Parto estimado de ${animal.nombre}`,
            dateEvent: partoDate.toISOString(),
            dateNotifi: notifiDate.toISOString(),
            sendNotifi: formData.notificationOffset,
            created_at: new Date().toISOString(),
          };
          const result = await notificationUtils.scheduleEventNotifications(eventData);
          await addEvent(eventData);
          notificationsSkipped = !result.success;
        }
        await updateAnimalPregnancy(animal.id, true);
      } else if (formData.accion === 'Aborto') {
        const events = animals.find((a) => a.id === animal.id)?.events || [];
        const partoEvent = events.find((event) => event.comentario.includes('Parto estimado'));
        if (partoEvent) {
          await deleteEvent(partoEvent.id);
        }
        await updateAnimalPregnancy(animal.id, false);
      } else if (formData.accion === 'Tratamiento') {
        const frecuencia = parseInt(formData.frecuencia, 10);
        const repeticiones = parseInt(formData.repeticiones, 10);
        for (let i = 0; i < repeticiones; i++) {
          const cycleDate = new Date(formData.registerDate);
          cycleDate.setDate(cycleDate.getDate() + i * frecuencia);
          const cycleNotifiDate = calculateNotificationDate(cycleDate, formData.notificationOffset);
          if (cycleNotifiDate.getTime() <= new Date().getTime()) {
            notificationsSkipped = true;
            continue;
          }
          const eventData = {
            id: uuidv4(),
            animalId: animal.id,
            animalName: animal.nombre,
            comentario: `${formData.comentario} (Ciclo ${i + 1})`,
            dateEvent: cycleDate.toISOString(),
            dateNotifi: cycleNotifiDate.toISOString(),
            sendNotifi: formData.notificationOffset,
            created_at: new Date().toISOString(),
          };
          const result = await notificationUtils.scheduleEventNotifications(eventData);
          await addEvent(eventData);
          if (!result.success) {notificationsSkipped = true;}
        }
      }

      Alert.alert(
        'Éxito',
        notificationsSkipped
          ? 'Registro creado, pero algunas notificaciones no se programaron porque la fecha está en el pasado.'
          : 'Registro creado'
      );
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', `No se pudo guardar el registro: ${error.message || 'Error desconocido'}`);
      console.error('Error al guardar registro:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <GlobalContainer>
      <Header
        title="Agregar Registro"
        iconOnPress="chevron-back-outline"
        onPress={() => navigation.goBack()}
      />
      <CustomScrollView style={GlobalStyles.padding20}>
        <Text style={styles.animalName}>
          Registro para: <Text style={styles.animalNameBold}>{animal.nombre}</Text>
        </Text>
        <Separator height={20} />
        <View style={styles.buttonContainer}>
          {acciones.map((accion) => (
            <MiniButton
              key={accion}
              text={accion}
              onPress={() => updateFormData({ accion })}
              backgroundColor={formData.accion === accion ? newColors.verde_light : newColors.fondo_secundario}
              color={formData.accion === accion ? 'white' : newColors.fondo_principal}
              icon=""
            />
          ))}
        </View>
        <Separator height={20} />
        <CustomInput
          value={formData.comentario}
          onChangeText={(value) => updateFormData({ comentario: value })}
          label="Comentario"
          placeholder="Escribe una descripción del registro"
          multiline
          required
        />
        {formData.accion === 'Tratamiento' && (
          <>
            <Separator height={20} />
            <CustomInput
              value={formData.frecuencia}
              onChangeText={(value) => updateFormData({ frecuencia: value })}
              label="Frecuencia (días)"
              placeholder="Cada cuántos días"
              keyboardType="numeric"
              required
            />
            <Separator height={20} />
            <CustomInput
              value={formData.repeticiones}
              onChangeText={(value) => updateFormData({ repeticiones: value })}
              label="Repeticiones"
              placeholder="Número de ciclos"
              keyboardType="numeric"
              required
            />
          </>
        )}
        <Separator height={20} />
        <DatePickerSection
          date={formData.registerDate}
          onDateChange={(date) => updateFormData({ registerDate: date })}
          label="Fecha del Registro"
        />
        <Separator height={20} />
        <Text style={styles.label}>¿Cuándo deseas que se notifique?</Text>
        <View style={styles.buttonContainer}>
          {NOTIFICATION_OFFSETS.map((offset) => {
            const notifiDate = calculateNotificationDate(formData.registerDate, offset.value);
            const isValid = notifiDate.getTime() > new Date().getTime();
            return (
              <MiniButton
                key={offset.value}
                text={offset.label}
                onPress={() => isValid && updateFormData({ notificationOffset: offset.value })}
                backgroundColor={
                  formData.notificationOffset === offset.value && isValid
                    ? newColors.verde_light
                    : newColors.fondo_secundario
                }
                color={
                  formData.notificationOffset === offset.value && isValid
                    ? 'white'
                    : newColors.fondo_principal
                }
                icon=""
                disabled={!isValid}
              />
            );
          })}
        </View>
        <Separator height={20} />
        <CustomButton
          text="Guardar Registro"
          icon="save-outline"
          onPress={handleSaveRegister}
          loading={isSaving}
          disabled={isSaving}
          backgroundColor={newColors.verde_light}
          textColor="white"
          width="100%"
        />
        <Separator height={200} />
      </CustomScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  animalName: {
    fontSize: 18,
    fontFamily: constants.FontText,
    color: newColors.fondo_secundario,
  },
  animalNameBold: {
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: newColors.rojo,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default CreateRegisterForm;
