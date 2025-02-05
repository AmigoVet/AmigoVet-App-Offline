import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { newColors } from '../../../../assets/styles/colors';
import { constants } from '../../../../assets/styles/constants';
import { CustomIcon } from '../../../../components/Customs';

interface Event {
  fecha: string;
  AnimalId: string;
  animalName: string;
  comentario: string;
}

interface DayObject {
  day: number;
  isCurrent: boolean;
  hasEvent: boolean;
}

export interface ProgrammerEvent {
  fecha: string;
  AnimalId: string;
  animalName: string;
  comentario: string;
}

interface ProgramerFeedProps {
  events: ProgrammerEvent[];
}

const ProgramerFeed: React.FC<ProgramerFeedProps> = ({ events = [] }) => {
  // Create today's date at the start of the day in the local timezone
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  const renderTimelineDays = (): JSX.Element => {
    const days = getDaysArray();
    return (
      <View style={styles.timelineContainer}>
        {days.map((dayObj, index) => (
          <View 
            key={index} 
            style={[
              styles.dayContainer,
              dayObj.isCurrent && styles.currentDayContainer
            ]}
          >
            <Text 
              style={[
                styles.timelineDay,
                dayObj.isCurrent && styles.currentDayText
              ]}
            >
              {dayObj.day}
            </Text>
            {dayObj.hasEvent && <View style={[
              styles.eventDot,
              dayObj.isCurrent && styles.currentDayDot
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

  const formatMessage = (event: Event): JSX.Element => {
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
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, styles.space]}>
            <CustomIcon name="calendar-outline" size={26} color={newColors.verde_light} />
          </View>
          <Text style={[styles.title, styles.space]}>Programador</Text>
          <View style={[styles.shareButtonContainer, styles.space]}>
            <Text style={styles.shareButton}>compartir</Text>
            <CustomIcon name="add-outline" size={24} color={newColors.gris} />
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            <Text style={styles.lotTitle}>Lote 1</Text>
          </View>

          {renderTimelineDays()}
          
          <View style={styles.notificationsContainer}>
            {todayEvent ? (
              <View style={[styles.notification, styles.activeNotification]}>
                <Text style={[styles.notificationText, styles.activeText]}>
                  {formatMessage(todayEvent)}
                </Text>
              </View>
            ) : (
              <View style={styles.emptyNotification}>
                <Text style={styles.notificationText}>No hay eventos para hoy</Text>
              </View>
            )}
          </View>
        </View>

        {nextEvent && (
          <View style={[styles.notification, styles.inactiveNotification, styles.outsideNotification]}>
            <Text style={[styles.notificationText, styles.inactiveText]}>
              {formatMessage(nextEvent)}
            </Text>
          </View>
        )}
        <Pressable onPress={() => console.log('hola')} style={styles.button}>
          <Text style={styles.buttonText}>Ver mas...</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProgramerFeed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: newColors.fondo_secundario,
    borderRadius: constants.borderRadius,
    width: '97%',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  space:{
    width: '33%',
  },
  iconContainer: {
    width: 26,
    height: 26,
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginLeft: 8,
    textAlign: 'center',
  },
  shareButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  shareButton: {
    color: newColors.gris,
    fontSize: 14,
  },
  content: {
    marginTop: 8,
    backgroundColor: newColors.gris_light,
    borderRadius: constants.borderRadius,
    paddingVertical: 8,
    paddingHorizontal: 5,
    width: '100%',
  },
  lotTitle: {
    color: newColors.verde,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    width: '100%',
    textAlign: 'center',
  },
  timelineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  dayContainer: {
    alignItems: 'center',
    width: 30,
  },
  currentDayContainer: {
    backgroundColor: newColors.verde_light,
    borderRadius: 15,
    padding: 4,
  },
  timelineDay: {
    color: newColors.principal,
    fontSize: 14,
    fontWeight: '900',
  },
  currentDayText: {
    color: newColors.fondo_secundario,
    fontWeight: '900',
  },
  currentDayDot: {
    width: 4,
    height: 4,
    backgroundColor: newColors.fondo_secundario,
    borderRadius: 2,
    marginTop: 2,
  },
  notificationsContainer: {
    marginTop: 8,
  },
  notification: {
    padding: 12,
    borderRadius: constants.borderRadius,
  },
  activeNotification: {
    backgroundColor: newColors.verde_light,
  },
  inactiveNotification: {
    borderWidth: 2,
    borderColor: newColors.principal,
  },
  outsideNotification: {
    marginTop: 16,
  },
  notificationText: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  activeText: {
    color: newColors.fondo_secundario,
  },
  inactiveText: {
    color: newColors.principal,
  },
  timeText: {
    fontSize: 12,
  },
  emptyNotification: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: newColors.gris_light,
    alignItems: 'center',
  },
  eventDot: {
    width: 6,
    height: 6,
    backgroundColor: newColors.principal,
    borderRadius: 3,
    marginTop: 2,
  },
  button:{
    height: 40,
    justifyContent: 'center',
    width: '100%',
  },
  buttonText:{
    color: newColors.verde_light,
    fontSize: 14,
    fontWeight: '200',
    textAlign: 'right',
  }
});
