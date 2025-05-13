import notifee, { AndroidImportance, TimestampTrigger, TriggerType, EventType } from '@notifee/react-native';
import { NotificationData, Events, sendNotifi } from '../../interfaces/Events';

// Initialize badge count handling for background events
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (!notification?.id) {return;}

  // Increment badge count when notification is delivered
  if (type === EventType.DELIVERED) {
    try {
      await notifee.incrementBadgeCount();
      const count = await notifee.getBadgeCount();
      console.log(`Badge count incremented to ${count} for notification ${notification.id}`);
    } catch (error) {
      console.error('Error incrementing badge count in background:', error);
    }
  }

  // Handle "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
    try {
      await notifee.decrementBadgeCount();
      await notifee.cancelNotification(notification.id);
      const count = await notifee.getBadgeCount();
      console.log(`Badge count decremented to ${count} for notification ${notification.id}`);
    } catch (error) {
      console.error('Error handling mark-as-read action in background:', error);
    }
  }
});

export const notificationUtils = {
  createScheduledNotification: async (notificationData: NotificationData) => {
    try {
      const now = new Date().getTime();
      if (notificationData.timestamp <= now) {
        console.warn(`Skipping notification ${notificationData.id}: timestamp ${new Date(notificationData.timestamp).toISOString()} is in the past`);
        return { success: false, error: new Error('Timestamp must be in the future') };
      }

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
            channelId: notificationData.androidChannelId || 'events',
            importance: AndroidImportance.HIGH,
            pressAction: { id: 'default' },
          },
          ios: {
            sound: notificationData.iosSound || 'default',
          },
        },
        trigger
      );

      // Increment badge count immediately after scheduling (for foreground)
      await notifee.incrementBadgeCount();
      const count = await notifee.getBadgeCount();
      console.log(`Badge count incremented to ${count} for notification ${notificationData.id}`);

      return { success: true, id: notificationData.id };
    } catch (error) {
      console.error('Error creating notification:', error);
      return { success: false, error };
    }
  },

  scheduleEventNotifications: async (event: Events) => {
    try {
      const now = new Date().getTime();
      let notificationsScheduled = false;

      const sendNotifiDisplayMap: { [key in sendNotifi]: string } = {
        '1d': 'un día',
        '2d': '2 días',
        '3d': '3 días',
        '4d': '4 días',
        '5d': '5 días',
        '1w': 'una semana',
        '2w': '2 semanas',
      };

      // Main notification (dateNotifi)
      const dateNotifi = new Date(event.dateNotifi);
      if (dateNotifi.getTime() > now) {
        const mainNotification: NotificationData = {
          id: event.id,
          title: `Recordatorio: ${event.animalName}`,
          body: `${event.comentario} será en ${sendNotifiDisplayMap[event.sendNotifi]}.`,
          timestamp: dateNotifi.getTime(),
          androidChannelId: 'events',
          iosSound: 'default',
        };
        const mainResult = await notificationUtils.createScheduledNotification(mainNotification);

        if (!mainResult.success) {
          console.warn('Failed to schedule main notification:', mainResult.error);
        } else {
          notificationsScheduled = true;
        }
      } else {
        console.warn(`Main notification for event ${event.id} skipped: dateNotifi ${event.dateNotifi} is in the past`);
      }

      // Reminder notification (2 hours before dateEvent)
      const dateEvent = new Date(event.dateEvent);
      const twoHoursBefore = new Date(dateEvent.getTime() - 2 * 60 * 60 * 1000);
      if (twoHoursBefore.getTime() > now) {
        const reminderNotification: NotificationData = {
          id: `${event.id}_reminder`,
          title: `Evento Próximo: ${event.animalName}`,
          body: `${event.comentario} será en 2 horas.`,
          timestamp: twoHoursBefore.getTime(),
          androidChannelId: 'events',
          iosSound: 'default',
        };
        const reminderResult = await notificationUtils.createScheduledNotification(reminderNotification);

        if (!reminderResult.success) {
          console.warn('Failed to schedule reminder notification:', reminderResult.error);
        } else {
          notificationsScheduled = true;
        }
      } else {
        console.warn(`Reminder notification for event ${event.id} skipped: reminder at ${twoHoursBefore.toISOString()} is in the past`);
      }

      if (!notificationsScheduled) {
        throw new Error('No notifications could be scheduled: all timestamps are in the past');
      }

      return { success: true };
    } catch (error) {
      console.error('Error scheduling notifications:', error);
      return { success: false, error };
    }
  },

  editScheduledNotifications: async (event: Events) => {
    try {
      await notifee.cancelNotification(event.id);
      await notifee.cancelNotification(`${event.id}_reminder`);
      return await notificationUtils.scheduleEventNotifications(event);
    } catch (error) {
      console.error('Error editing notifications:', error);
      return { success: false, error };
    }
  },

  deleteScheduledNotifications: async (eventId: string) => {
    try {
      await notifee.cancelNotification(eventId);
      await notifee.cancelNotification(`${eventId}_reminder`);
      const count = await notifee.getBadgeCount();
      if (count > 0) {
        await notifee.decrementBadgeCount(2); // Decrement for main and reminder
        console.log(`Badge count decremented by 2 to ${await notifee.getBadgeCount()}`);
      }
      return { success: true };
    } catch (error) {
      console.error('Error deleting notifications:', error);
      return { success: false, error };
    }
  },

  getScheduledNotifications: async () => {
    try {
      const notifications = await notifee.getTriggerNotifications();
      return { success: true, notifications };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return { success: false, error };
    }
  },
};

// Handle foreground events
notifee.onForegroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (!notification?.id) {return;}

  // Increment badge count when notification is delivered
  if (type === EventType.DELIVERED) {
    try {
      await notifee.incrementBadgeCount();
      const count = await notifee.getBadgeCount();
      console.log(`Badge count incremented to ${count} for notification ${notification.id}`);
    } catch (error) {
      console.error('Error incrementing badge count in foreground:', error);
    }
  }

  // Handle "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
    try {
      await notifee.decrementBadgeCount();
      await notifee.cancelNotification(notification.id);
      const count = await notifee.getBadgeCount();
      console.log(`Badge count decremented to ${count} for notification ${notification.id}`);
    } catch (error) {
      console.error('Error handling mark-as-read action in foreground:', error);
    }
  }
});
