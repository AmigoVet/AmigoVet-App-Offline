import { v4 as uuidv4 } from 'uuid';
import notifee, { TimestampTrigger, TriggerType, AndroidImportance } from '@notifee/react-native';
import { Animal, Especie } from '../../../../../lib/interfaces/Animal';
import { Events } from '../../../../../lib/interfaces/Events';
import { calculateCycleDates } from '../../../../../lib/functions/calculateCycleDates';
import { calculatePartoDate } from '../../../../../lib/functions/calculatePartoDate';
import { textNotification } from '../events/textNotification';

interface ValidateInputsParams {
  comentario: string;
  accion: string;
  frecuencia: string;
  repeticiones: string;
  registerDate: Date;
  animal?: Animal;
}

export const validateRegisterInputs = ({ comentario, accion, frecuencia, repeticiones, registerDate, animal }: ValidateInputsParams): string | null => {
  if (!comentario.trim()) return 'El comentario no puede estar vacío.';
  if (!accion) return 'Por favor, selecciona una acción.';
  if (accion === 'Tratamiento') {
    const freq = parseInt(frecuencia, 10);
    const reps = parseInt(repeticiones, 10);
    if (isNaN(freq) || freq < 1) return 'La frecuencia debe ser un número mayor a 0.';
    if (isNaN(reps) || reps < 1) return 'El número de repeticiones debe ser mayor a 0.';
  }
  if (!registerDate) return 'Por favor, selecciona una fecha para el registro.';
  if (!animal?.id || !animal?.nombre) return 'Faltan datos del animal (ID o nombre).';
  return null;
};

interface CreatePartoEventParams {
  animal: Animal;
  registerDate: Date;
  notificationDate: Date;
  accion: string;
  addEvent: (event: Events) => Promise<void>;
  updateAnimalPregnancy: (animalId: string, embarazada: boolean) => Promise<void>;
}

export const createPartoEvent = async ({ animal, registerDate, notificationDate, accion, addEvent, updateAnimalPregnancy }: CreatePartoEventParams) => {
  const partoDate = animal.especie
    ? calculatePartoDate(registerDate, animal.especie as Especie)
    : calculatePartoDate(registerDate, 'Bovino'); // Fallback
  console.log('Parto Date:', partoDate.toISOString());
  console.log('Notification Date:', notificationDate.toISOString());

  const partoEvent: Events = {
    id: uuidv4(),
    animalId: animal.id,
    animalName: animal.nombre,
    comentario: `Parto estimado (${accion})`,
    fecha: partoDate.toISOString().split('T')[0],
    created_at: new Date().toISOString(),
    horaDeseada: notificationDate.getHours(),
    minutosDeseado: notificationDate.getMinutes(),
    DiaDeseado: notificationDate.getDate(),
    MesDeseado: notificationDate.getMonth() + 1,
    AnioDeseado: notificationDate.getFullYear(),
    horaEvento: partoDate.getHours(),
    minutosEvento: partoDate.getMinutes(),
    DiaEvento: partoDate.getDate(),
    MesEvento: partoDate.getMonth() + 1,
    AnioEvento: partoDate.getFullYear(),
  };

  await addEvent(partoEvent);
  const notificationsSkipped = !(await scheduleNotification({
    event: partoEvent,
    animalNombre: animal.nombre,
    notificationDate,
    description: partoEvent.comentario,
  }));

  await updateAnimalPregnancy(animal.id, true);
  return { notificationsSkipped };
};

interface CreateTreatmentCycleEventsParams {
  animal: Animal;
  registerDate: Date;
  notificationDate: Date;
  comentario: string;
  frecuencia: number;
  repeticiones: number;
  addEvent: (event: Events) => Promise<void>;
}

export const createTreatmentCycleEvents = async ({ animal, registerDate, notificationDate, comentario, frecuencia, repeticiones, addEvent }: CreateTreatmentCycleEventsParams) => {
  const cycleDates = calculateCycleDates(registerDate, frecuencia, repeticiones);
  let notificationsSkipped = false;
  for (let i = 0; i < cycleDates.length; i++) {
    const cycleEvent: Events = {
      id: uuidv4(),
      animalId: animal.id,
      animalName: animal.nombre,
      comentario: `${comentario} (Ciclo ${i + 1})`,
      fecha: cycleDates[i].toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      horaDeseada: notificationDate.getHours(),
      minutosDeseado: notificationDate.getMinutes(),
      DiaDeseado: notificationDate.getDate(),
      MesDeseado: notificationDate.getMonth() + 1,
      AnioDeseado: notificationDate.getFullYear(),
      horaEvento: registerDate.getHours(),
      minutosEvento: registerDate.getMinutes(),
      DiaEvento: cycleDates[i].getDate(),
      MesEvento: cycleDates[i].getMonth() + 1,
      AnioEvento: cycleDates[i].getFullYear(),
    };
    await addEvent(cycleEvent);
    const skipped = !(await scheduleNotification({
      event: cycleEvent,
      animalNombre: animal.nombre,
      notificationDate,
      description: cycleEvent.comentario,
    }));
    if (skipped) notificationsSkipped = true;
  }
  return { notificationsSkipped };
};

interface ScheduleNotificationParams {
  event: Events;
  animalNombre: string;
  notificationDate: Date;
  description: string;
}

export const scheduleNotification = async ({ event, animalNombre, notificationDate, description }: ScheduleNotificationParams): Promise<boolean> => {
  if (notificationDate.getTime() <= Date.now()) {
    console.warn(`Notification skipped for event ${event.id}: notificationDate (${notificationDate.toISOString()}) is in the past.`);
    return false;
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: notificationDate.getTime(),
  };
  await notifee.createTriggerNotification(
    {
      id: event.id,
      title: `Recordatorio para ${animalNombre}`,
      body: textNotification({
        yearNotification: String(notificationDate.getFullYear()),
        monthNotification: String(notificationDate.getMonth() + 1),
        dayNotification: String(notificationDate.getDate()),
        hourNotification: String(notificationDate.getHours()),
        minuteNotification: String(notificationDate.getMinutes()),
        yearEvent: String(new Date(event.fecha).getFullYear()),
        monthEvent: String(new Date(event.fecha).getMonth() + 1),
        dayEvent: String(new Date(event.fecha).getDate()),
        hourEvent: String(event.horaEvento),
        minuteEvent: String(event.minutosEvento),
        description,
      }),
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
      },
      ios: { sound: 'default' },
    },
    trigger
  );
  return true;
};