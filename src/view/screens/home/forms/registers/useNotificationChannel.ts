import { useEffect, useState } from 'react';
import notifee, { AndroidImportance } from '@notifee/react-native';

export const useNotificationChannel = (channelId: string, channelName: string) => {
  const [channelReady, setChannelReady] = useState(false);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        await notifee.requestPermission();
        await notifee.createChannel({
          id: channelId,
          name: channelName,
          importance: AndroidImportance.HIGH,
        });
        setChannelReady(true);
      } catch (error) {
        console.error('Error setting up notifications:', error);
        setChannelReady(false);
      }
    };
    setupNotifications();
  }, [channelId, channelName]);

  return { channelReady };
};
