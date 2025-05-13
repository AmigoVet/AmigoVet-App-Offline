import { useCallback } from 'react';
import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { Events, NotificationData } from '../interfaces/Events';

export const useNotifi = () => {
  // Crear una notificación programada
  const createScheduledNotification = useCallback(
    async (notificationData: NotificationData) => {
      try {
        const trigger: TimestampTrigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: notificationData.timestamp,
        };

        await notifee.createTriggerNotification(
          {
            id: notificationData.id,
            title: notificationData.title,
            body: notificationData.body,
            android: {
              channelId: notificationData.androidChannelId || 'default',
              importance: AndroidImportance.HIGH,
              pressAction: { id: 'default' },
            },
            ios: {
              sound: notificationData.iosSound || 'default',
            },
          },
          trigger
        );
        return { success: true, id: notificationData.id };
      } catch (error) {
        console.error('Error creating notification:', error);
        return { success: false, error };
      }
    },
    []
  );

  // Programar notificaciones para un evento
  const scheduleEventNotifications = useCallback(
    async (event: Events) => {
      try {
        // Notificación principal (dateNotifi)
        const dateNotifi = new Date(event.dateNotifi);
        const mainNotification: NotificationData = {
          id: event.id,
          title: `Recordatorio: ${event.animalName}`,
          body: event.comentario,
          timestamp: dateNotifi.getTime(),
          androidChannelId: 'events',
          iosSound: 'default',
        };
        const mainResult = await createScheduledNotification(mainNotification);

        if (!mainResult.success) {
          throw new Error('Failed to schedule main notification');
        }

        // Notificación adicional (2 horas antes del evento)
        const dateEvent = new Date(event.dateEvent);
        const twoHoursBefore = new Date(dateEvent.getTime() - 2 * 60 * 60 * 1000); // 2 horas antes
        const reminderNotification: NotificationData = {
          id: `${event.id}_reminder`, // ID único para la notificación adicional
          title: `Evento Próximo: ${event.animalName}`,
          body: `El evento "${event.comentario}" es en 2 horas.`,
          timestamp: twoHoursBefore.getTime(),
          androidChannelId: 'events',
          iosSound: 'default',
        };
        const reminderResult = await createScheduledNotification(reminderNotification);

        if (!reminderResult.success) {
          throw new Error('Failed to schedule reminder notification');
        }

        return { success: true };
      } catch (error) {
        console.error('Error scheduling notifications:', error);
        return { success: false, error };
      }
    },
    [createScheduledNotification]
  );

  // Editar notificaciones de un evento
  const editScheduledNotifications = useCallback(
    async (event: Events) => {
      try {
        // Cancelar notificaciones existentes
        await notifee.cancelNotification(event.id);
        await notifee.cancelNotification(`${event.id}_reminder`);

        // Programar nuevas notificaciones
        return await scheduleEventNotifications(event);
      } catch (error) {
        console.error('Error editing notifications:', error);
        return { success: false, error };
      }
    },
    [scheduleEventNotifications]
  );

  // Eliminar notificaciones de un evento
  const deleteScheduledNotifications = useCallback(async (eventId: string) => {
    try {
      await notifee.cancelNotification(eventId);
      await notifee.cancelNotification(`${eventId}_reminder`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting notifications:', error);
      return { success: false, error };
    }
  }, []);

  // Obtener todas las notificaciones programadas
  const getScheduledNotifications = useCallback(async () => {
    try {
      const notifications = await notifee.getTriggerNotifications();
      return { success: true, notifications };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return { success: false, error };
    }
  }, []);

  return {
    scheduleEventNotifications,
    editScheduledNotifications,
    deleteScheduledNotifications,
    getScheduledNotifications,
  };
};
