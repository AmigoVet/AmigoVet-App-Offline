import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import { useAuthStore } from '../../../../lib/store/authStore';
import { Events } from '../../../../lib/interfaces/Events';
import Separator from '../../../components/Separator';
import { constants } from '../../../styles/constants';
import { newColors } from '../../../styles/colors';
import EventItem from './components/EventItem';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../navigator/navigationTypes';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Configurar el idioma del calendario en español
LocaleConfig.locales.es = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

const CalendarScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuthStore();
  const { animals, events, totalEvents, loadAnimals, loadEvents } = useAnimalStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedEvents, setSelectedEvents] = useState<Events[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user?.id) {return;}

      try {
        setLoading(true);
        // 1. Cargar los animales del usuario
        await loadAnimals(1, 10, user.id);
        // 2. Obtener los IDs de los animales
        const animalsIds = animals.map((animal) => animal.id);
        // 3. Cargar los eventos filtrados por animalsIds
        await loadEvents(1, totalEvents || 100, {}, animalsIds);
        setError(null);
      } catch (err: any) {
        setError('Error al cargar los eventos: ' + (err.message || 'Desconocido'));
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadAnimals, loadEvents, totalEvents, user]);

  useEffect(() => {
    const filteredEvents = events.filter(event => {
      try {
        const eventDate = parseISO(event.dateEvent);
        return format(eventDate, 'yyyy-MM-dd') === selectedDate;
      } catch {
        return false;
      }
    });
    setSelectedEvents(filteredEvents);
  }, [selectedDate, events]);

  const markedDates = events.reduce((acc, event) => {
    try {
      const eventDate = parseISO(event.dateEvent);
      const date = format(eventDate, 'yyyy-MM-dd');
      acc[date] = { marked: true, dotColor: newColors.verde_light };
    } catch {
      console.warn(`Invalid dateEvent for event ${event.id}: ${event.dateEvent}`);
    }
    return acc;
  }, {} as { [key: string]: { marked: boolean; dotColor: string; selected?: boolean; selectedColor?: string; selectedTextColor?: string } });

  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
    selected: true,
    selectedColor: newColors.verde_light,
    selectedTextColor: newColors.fondo_principal,
  };

  const displayDate = parseISO(selectedDate);

  return (
    <GlobalContainer>
      <Header title="Calendario" iconOnPress="chevron-back-outline" onPress={() => navigation.goBack()} />
      <Separator height={20} />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={newColors.verde_light} />
          <Text>Cargando eventos...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          <View style={styles.calendarContainer}>
            <Text style={styles.filterText}>Todos</Text>
            <Calendar
              style={styles.calendar}
              markedDates={markedDates}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              theme={{
                calendarBackground: newColors.fondo_principal,
                textSectionTitleColor: newColors.fondo_secundario,
                dayTextColor: newColors.fondo_secundario,
                todayTextColor: newColors.verde_light,
                textDisabledColor: newColors.gris_light,
                monthTextColor: newColors.verde_light,
                arrowColor: newColors.fondo_secundario,
                textDayFontSize: 18,
                textDayFontFamily: constants.FontText,
                textDayFontWeight: '400',
                textMonthFontSize: 20,
                textMonthFontFamily: constants.FontTitle,
                textMonthFontWeight: 'bold',
                textDayHeaderFontSize: 16,
                textDayHeaderFontFamily: constants.FontTitle,
                textDayHeaderFontWeight: '600',
              }}
            />
          </View>

          <View style={styles.eventsContainer}>
            <View style={styles.eventsHeader}>
              <Text style={styles.eventsHeaderText}>
                {format(displayDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
              </Text>
              <View style={styles.eventCount}>
                <Text style={styles.eventCountText}>{selectedEvents.length}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.arrowDown}>▼</Text>
              </TouchableOpacity>
            </View>

            {selectedEvents.length === 0 ? (
              <Text style={styles.noEventsText}>No hay eventos para este día.</Text>
            ) : (
              <FlatList
                data={selectedEvents}
                renderItem={({ item }) => <EventItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.eventsList}
                nestedScrollEnabled={true}
              />
            )}
          </View>
        </>
      )}
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: newColors.rojo,
    fontSize: 16,
    textAlign: 'center',
  },
  calendarContainer: {
    borderWidth: constants.borderWidth,
    borderRadius: constants.borderRadius,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  filterText: {
    fontSize: 14,
    color: newColors.fondo_secundario,
    marginBottom: 10,
    fontWeight: '600',
    fontFamily: constants.FontTitle,
  },
  calendar: {
    borderRadius: constants.borderRadius,
  },
  eventsContainer: {
    borderRadius: 15,
    padding: 15,
    paddingBottom: 0,
    flex: 1,
  },
  eventsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 15,
  },
  eventsHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: newColors.fondo_secundario,
    fontFamily: constants.FontTitle,
    textTransform: 'capitalize',
  },
  eventCount: {
    backgroundColor: newColors.verde,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  eventCountText: {
    color: newColors.fondo_principal,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: constants.FontTitle,
  },
  arrowDown: {
    fontSize: 16,
    color: newColors.fondo_secundario,
  },
  eventsList: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  noEventsText: {
    fontSize: 18,
    paddingTop: 40,
    fontFamily: constants.FontText,
    color: newColors.gris,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default CalendarScreen;
