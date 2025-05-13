import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, Button, ActivityIndicator } from 'react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import notifee, { TriggerNotification } from '@notifee/react-native';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { newColors } from '../../../styles/colors';
import { constants } from '../../../styles/constants';
import { notificationUtils } from '../../../../lib/utils/notifi/notificationUtils';

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: number;
}

const Feed = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch scheduled notifications
  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await notificationUtils.getScheduledNotifications();
      if (result.success) {
        const notificationItems = result.notifications.map((notif: TriggerNotification) => ({
          id: notif.notification.id,
          title: notif.notification.title || 'Sin título',
          body: notif.notification.body || 'Sin descripción',
          timestamp: notif.trigger?.timestamp || 0,
        }));
        setNotifications(notificationItems);
      } else {
        throw new Error(result.error?.message || 'Error desconocido al obtener notificaciones');
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('No se pudieron cargar las notificaciones. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Increment badge count
  const sendNotification = async () => {
    try {
      await notifee.incrementBadgeCount();
      const count = await notifee.getBadgeCount();
      console.log('Badge count incremented by 1 to:', count);
    } catch (error) {
      console.error('Error incrementing badge count:', error);
    }
  };

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Render a single notification item
  const renderNotification = ({ item }: { item: NotificationItem }) => {
    const triggerDate = item.timestamp ? new Date(item.timestamp) : null;
    const formattedDate = triggerDate
      ? format(triggerDate, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es })
      : 'Fecha desconocida';

    return (
      <View style={styles.notificationCard}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <Text style={styles.date}>Programada para: {formattedDate}</Text>
      </View>
    );
  };

  return (
    <GlobalContainer>
      <Header title="Feed" />
      <View style={styles.container}>
        <Button title="Enviar Notificación" onPress={sendNotification} />
        <Separator height={20} />
        <Text style={styles.sectionTitle}>Notificaciones Programadas</Text>
        {loading ? (
          <ActivityIndicator size="large" color={newColors.verde_light} />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : notifications.length === 0 ? (
          <Text style={styles.empty}>No hay notificaciones programadas.</Text>
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        )}
      </View>
    </GlobalContainer>
  );
};

const Separator = ({ height }: { height: number }) => (
  <View style={{ height }} />
);

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
    marginBottom: 10,
  },
  notificationCard: {
    backgroundColor: newColors.fondo_principal,
    borderRadius: constants.borderRadius,
    padding: 15,
    marginBottom: 10,
    borderWidth: constants.borderWidth,
    borderColor: newColors.fondo_secundario,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: newColors.fondo_secundario,
    fontFamily: constants.FontTitle,
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
    fontStyle: 'italic',
  },
  list: {
    flex: 1,
  },
  empty: {
    fontSize: 16,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    fontSize: 16,
    color: newColors.rojo,
    fontFamily: constants.FontText,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Feed;