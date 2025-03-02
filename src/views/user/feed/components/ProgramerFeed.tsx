import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { newColors } from '../../../../assets/styles/colors';
import { CustomIcon } from '../../../../components/Customs';
import { Events } from '../../../../lib/interfaces/events';
import { ProgramerFeedStyles } from './ProgramerFeedStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Welcome';

interface DayObject {
  day: number;
  isCurrent: boolean;
  hasEvent: boolean;
}

interface ProgramerFeedProps {
  events: Events[];
}

const ProgramerFeed: React.FC<ProgramerFeedProps> = ({ events = [] }) => {
  // Create today's date at the start of the day in the local timezone
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const {navigate} = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getDaysArray = (): DayObject[] => {
    const currentDay = today.getDate();
    const days: DayObject[] = [];
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(currentDay + i);
      // Format date in YYYY-MM-DD format for comparison
      const formattedDate = date.toISOString().split('T')[0];
      const hasEvent = events.some(event => event.fecha === formattedDate);
      
      days.push({
        day: date.getDate(),
        isCurrent: i === 0,
        hasEvent
      });
    }
    
    return days;
  };

  const obtenerNombreMesActual = () => {
    const fecha = new Date();
    const nombresMeses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return nombresMeses[fecha.getMonth()];
  };
  

  const renderTimelineDays = (): JSX.Element => {
    const days = getDaysArray();
    return (
      <View style={ProgramerFeedStyles.timelineContainer}>
        {days.map((dayObj, index) => (
          <View 
            key={index} 
            style={[
              ProgramerFeedStyles.dayContainer,
              dayObj.isCurrent && ProgramerFeedStyles.currentDayContainer
            ]}
          >
            <Text 
              style={[
                ProgramerFeedStyles.timelineDay,
                dayObj.isCurrent && ProgramerFeedStyles.currentDayText
              ]}
            >
              {dayObj.day}
            </Text>
            {dayObj.hasEvent && <View style={[
              ProgramerFeedStyles.eventDot,
              dayObj.isCurrent && ProgramerFeedStyles.currentDayDot
            ]} />}
          </View>
        ))}
      </View>
    );
  };

  const isToday = (dateString: string): boolean => {
    const eventDate = new Date(dateString + 'T00:00:00');
    eventDate.setHours(0, 0, 0, 0);
    return today.getTime() === eventDate.getTime();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  const formatMessage = (event: Events): JSX.Element => {
    return isToday(event.fecha) ? (
      <Text>
        {event.comentario} de <Text style={{ color: newColors.principal }}>{event.animalName}</Text> será Hoy!
      </Text>
    ) : (
      <Text>
        {event.comentario} de <Text style={{ color: newColors.verde_light }}>{event.animalName}</Text> será el {formatDate(event.fecha)}
      </Text>
    );
  };
  

  // Ordenar eventos por fecha
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
  });

  // Encontrar el evento de hoy y el próximo evento
  const todayEvent = sortedEvents.find(event => isToday(event.fecha));
  const nextEvent = sortedEvents.find(event => {
    const eventDate = new Date(event.fecha + 'T00:00:00');
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() > today.getTime();
  });

  return (
    <View style={{alignItems: 'center'}}>
      <View style={ProgramerFeedStyles.container}>
        <View style={ProgramerFeedStyles.header}>
          <View style={[ProgramerFeedStyles.iconContainer, ProgramerFeedStyles.space]}>
            <CustomIcon name="calendar-outline" size={26} color={newColors.verde_light} />
          </View>
          <Text style={[ProgramerFeedStyles.title, ProgramerFeedStyles.space]}>Programador</Text>
          <View style={[ProgramerFeedStyles.shareButtonContainer, ProgramerFeedStyles.space]}>
            <Text style={ProgramerFeedStyles.shareButton}>compartir</Text>
            <CustomIcon name="add-outline" size={24} color={newColors.gris_light} />
          </View>
        </View>
        
        <View style={ProgramerFeedStyles.content}>
          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            <Text style={ProgramerFeedStyles.lotTitle}>{obtenerNombreMesActual()}</Text>  
          </View>

          {renderTimelineDays()}
          
          <View style={ProgramerFeedStyles.notificationsContainer}>
            {todayEvent ? (
              <View style={[ProgramerFeedStyles.notification, ProgramerFeedStyles.activeNotification]}>
                <Text style={[ProgramerFeedStyles.notificationText, ProgramerFeedStyles.activeText]}>
                  {formatMessage(todayEvent)}
                </Text>
              </View>
            ) : (
              <View style={ProgramerFeedStyles.emptyNotification}>
                <Text style={ProgramerFeedStyles.notificationText}>No hay eventos para hoy</Text>
              </View>
            )}
          </View>
        </View>

        {nextEvent && (
          <View style={[ProgramerFeedStyles.notification, ProgramerFeedStyles.inactiveNotification, ProgramerFeedStyles.outsideNotification]}>
            <Text style={[ProgramerFeedStyles.notificationText, ProgramerFeedStyles.inactiveText]}>
              {formatMessage(nextEvent)}
            </Text>
          </View>
        )}
        <Pressable onPress={() => navigate('Calendar')} style={ProgramerFeedStyles.button}>
          <Text style={ProgramerFeedStyles.buttonText}>Ver mas...</Text>
        </Pressable>
      </View>
      <View style={ProgramerFeedStyles.containerExtra}>
        <Text style={ProgramerFeedStyles.containerExtraText}>!No te olvides de revisar tus eventos!</Text>
      </View>
    </View>
  );
};

export default ProgramerFeed;


