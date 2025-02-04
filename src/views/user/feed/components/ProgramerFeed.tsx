import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { newColors } from '../../../../assets/styles/colors';
import { constants } from '../../../../assets/styles/constants';
import { CustomIcon } from '../../../../components/Customs';

const ProgramerFeed = () => {
  const timelineData = [
    { id: 1, time: '08:30', message: 'El parto de V2345 sera ¡¡Hoy!!', active: true },
    { id: 2, time: '12:30', message: 'V567 entrara en celo pronto', active: false }
  ];

  const getDaysArray = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const days = [];
    
    // Generamos 3 días antes y 3 días después del día actual
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(currentDay + i);
      days.push({
        day: date.getDate(),
        isCurrent: i === 0
      });
    }
    
    return days;
  };

  const renderTimelineDays = () => {
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
            {dayObj.isCurrent && <View style={styles.currentDayDot} />}
          </View>
        ))}
      </View>
    );
  };

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
        <Text style={styles.lotTitle}>Lote 1</Text>
        
        {renderTimelineDays()}
        
        <View style={styles.notificationsContainer}>
          {timelineData.map((item) => (
            <View
              key={item.id}
              style={[
                styles.notification,
                item.active ? styles.activeNotification : styles.inactiveNotification
              ]}
            >
              <Text style={[
                styles.notificationText,
                item.active ? styles.activeText : styles.inactiveText
              ]}>
                {item.message}
              </Text>
              <Text style={[
                styles.timeText,
                item.active ? styles.activeText : styles.inactiveText
              ]}>
                {item.time}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: newColors.fondo_secundario,
    borderRadius: constants.borderRadius,
    padding: 16,
    width: '97%',
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
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
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
  },
  lotTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
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
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 4,
  },
  timelineDay: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  currentDayText: {
    color: 'white',
    fontWeight: '600',
  },
  currentDayDot: {
    width: 4,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
    marginTop: 2,
  },
  notificationsContainer: {
    marginTop: 8,
  },
  notification: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeNotification: {
    backgroundColor: '#4CAF50',
  },
  inactiveNotification: {
    backgroundColor: '#333',
  },
  notificationText: {
    fontSize: 14,
    marginBottom: 4,
  },
  activeText: {
    color: 'white',
  },
  inactiveText: {
    color: '#888',
  },
  timeText: {
    fontSize: 12,
  },
});

export default ProgramerFeed;