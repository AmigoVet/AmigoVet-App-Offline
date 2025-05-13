import React, { JSX } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { format, isSameDay, parseISO, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Events, sendNotifi } from '../../../../../lib/interfaces/Events';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import { newColors } from '../../../../styles/colors';
import { ProgramerHomeStyles } from './ProgramerHomeStyles';

interface DayObject {
  day: number;
  isCurrent: boolean;
  hasEvent: boolean;
}

interface ProgramerHomeProps {
  events: Events[];
}

const ProgramerHome: React.FC<ProgramerHomeProps> = ({ events = [] }) => {
  // Create today's date at the start of the day
  const today = startOfDay(new Date());

  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getDaysArray = (): DayObject[] => {
    const currentDay = today.getDate();
    const days: DayObject[] = [];

    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(currentDay + i);
      const startOfDate = startOfDay(date);
      const hasEvent = events.some(event => {
        try {
          const eventDate = parseISO(event.dateEvent);
          return isSameDay(eventDate, startOfDate);
        } catch {
          return false;
        }
      });

      days.push({
        day: date.getDate(),
        isCurrent: i === 0,
        hasEvent,
      });
    }

    return days;
  };

  const obtenerNombreMesActual = () => {
    return format(today, 'MMMM', { locale: es });
  };

  const renderTimelineDays = (): JSX.Element => {
    const days = getDaysArray();
    return (
      <View style={ProgramerHomeStyles.timelineContainer}>
        {days.map((dayObj, index) => (
          <View
            key={index}
            style={[
              ProgramerHomeStyles.dayContainer,
              dayObj.isCurrent && ProgramerHomeStyles.currentDayContainer,
            ]}
          >
            <Text
              style={[
                ProgramerHomeStyles.timelineDay,
                dayObj.isCurrent && ProgramerHomeStyles.currentDayText,
              ]}
            >
              {dayObj.day}
            </Text>
            {dayObj.hasEvent && (
              <View
                style={[
                  ProgramerHomeStyles.eventDot,
                  dayObj.isCurrent && ProgramerHomeStyles.currentDayDot,
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const isToday = (dateString: string): boolean => {
    try {
      const eventDate = parseISO(dateString);
      return isSameDay(eventDate, today);
    } catch {
      return false;
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = parseISO(dateString);
      return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
    } catch {
      return 'Fecha inválida';
    }
  };

  const formatMessage = (event: Events): JSX.Element => {
    const sendNotifiDisplayMap: { [key in sendNotifi]: string } = {
      '1d': 'un día',
      '2d': '2 días',
      '3d': '3 días',
      '4d': '4 días',
      '5d': '5 días',
      '1w': 'una semana',
      '2w': '2 semanas',
    };

    const notificationText = event.sendNotifi
      ? `Se te notificará en ${sendNotifiDisplayMap[event.sendNotifi]}`
      : 'Sin notificación programada';

    return isToday(event.dateEvent) ? (
      <Text>
        {event.comentario} de <Text style={{ color: newColors.principal }}>{event.animalName}</Text> es hoy!{' '}
      </Text>
    ) : (
      <Text>
        {event.comentario} de <Text style={{ color: newColors.verde_light }}>{event.animalName}</Text> será el{' '}
        {formatDate(event.dateEvent)}. <Text style={{ color: newColors.fondo_secundario }}>{notificationText}</Text>
      </Text>
    );
  };

  // Ordenar eventos por dateEvent
  const sortedEvents = [...events].sort((a, b) => {
    try {
      return parseISO(a.dateEvent).getTime() - parseISO(b.dateEvent).getTime();
    } catch {
      return 0;
    }
  });

  // Encontrar el evento de hoy y el próximo evento
  const todayEvent = sortedEvents.find(event => isToday(event.dateEvent));
  const nextEvent = sortedEvents.find(event => {
    try {
      const eventDate = startOfDay(parseISO(event.dateEvent));
      return eventDate.getTime() > today.getTime();
    } catch {
      return false;
    }
  });

  return (
    <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
      <View style={ProgramerHomeStyles.container}>
        <View style={ProgramerHomeStyles.header}>
          <Text style={[ProgramerHomeStyles.title, ProgramerHomeStyles.space]}>Programador</Text>
        </View>

        <View style={ProgramerHomeStyles.content}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={ProgramerHomeStyles.lotTitle}>{obtenerNombreMesActual()}</Text>
          </View>

          {renderTimelineDays()}

          <View style={ProgramerHomeStyles.notificationsContainer}>
            {todayEvent ? (
              <View style={[ProgramerHomeStyles.notification, ProgramerHomeStyles.activeNotification]}>
                <Text style={[ProgramerHomeStyles.notificationText, ProgramerHomeStyles.activeText]}>
                  {formatMessage(todayEvent)}
                </Text>
              </View>
            ) : (
              <View style={ProgramerHomeStyles.emptyNotification}>
                <Text style={ProgramerHomeStyles.notificationText}>No hay eventos para hoy</Text>
              </View>
            )}
          </View>
        </View>

        {nextEvent && (
          <View
            style={[
              ProgramerHomeStyles.notification,
              ProgramerHomeStyles.inactiveNotification,
              ProgramerHomeStyles.outsideNotification,
            ]}
          >
            <Text style={[ProgramerHomeStyles.notificationText, ProgramerHomeStyles.inactiveText]}>
              {formatMessage(nextEvent)}
            </Text>
          </View>
        )}
        <Pressable onPress={() => navigate('Calendar')} style={ProgramerHomeStyles.button}>
          <Text style={ProgramerHomeStyles.buttonText}>Ver más...</Text>
        </Pressable>
      </View>
      <View style={ProgramerHomeStyles.containerExtra}>
        <Text style={ProgramerHomeStyles.containerExtraText}>¡No te olvides de revisar tus eventos!</Text>
      </View>
    </View>
  );
};

export default ProgramerHome;
