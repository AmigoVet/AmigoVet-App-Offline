
import { View, Text, Pressable } from 'react-native';
import React, { JSX } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { Events } from '../../../../../lib/interfaces/Events';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import { newColors } from '../../../../styles/colors';
import Icon from '@react-native-vector-icons/ionicons';
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
      <View style={ProgramerHomeStyles.timelineContainer}>
        {days.map((dayObj, index) => (
          <View 
            key={index} 
            style={[
              ProgramerHomeStyles.dayContainer,
              dayObj.isCurrent && ProgramerHomeStyles.currentDayContainer
            ]}
          >
            <Text 
              style={[
                ProgramerHomeStyles.timelineDay,
                dayObj.isCurrent && ProgramerHomeStyles.currentDayText
              ]}
            >
              {dayObj.day}
            </Text>
            {dayObj.hasEvent && <View style={[
              ProgramerHomeStyles.eventDot,
              dayObj.isCurrent && ProgramerHomeStyles.currentDayDot
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
    <View style={{alignItems: 'center', width: '100%', justifyContent: 'center'}}>
      <View style={ProgramerHomeStyles.container}>
        <View style={ProgramerHomeStyles.header}>
          {/* <View style={[ProgramerHomeStyles.iconContainer, ProgramerHomeStyles.space]}>
            <Icon name="calendar-outline" size={26} color={newColors.verde_light} />
          </View> */}
          <Text style={[ProgramerHomeStyles.title, ProgramerHomeStyles.space]}>Programador</Text>
        </View>
        
        <View style={ProgramerHomeStyles.content}>
          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
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
          <View style={[ProgramerHomeStyles.notification, ProgramerHomeStyles.inactiveNotification, ProgramerHomeStyles.outsideNotification]}>
            <Text style={[ProgramerHomeStyles.notificationText, ProgramerHomeStyles.inactiveText]}>
              {formatMessage(nextEvent)}
            </Text>
          </View>
        )}
        <Pressable onPress={() => navigate('Calendar')} style={ProgramerHomeStyles.button}>
          <Text style={ProgramerHomeStyles.buttonText}>Ver mas...</Text>
        </Pressable>
      </View>
      <View style={ProgramerHomeStyles.containerExtra}>
        <Text style={ProgramerHomeStyles.containerExtraText}>!No te olvides de revisar tus eventos!</Text>
      </View>
    </View>
  );
};

export default ProgramerHome;


