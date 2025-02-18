import { StyleSheet } from "react-native";
import { newColors } from "../../../../assets/styles/colors";
import { constants } from "../../../../assets/styles/constants";

export const ProgramerFeedStyles = StyleSheet.create({
    container: {
      backgroundColor: newColors.fondo_secundario,
      borderRadius: constants.borderRadius,
      width: '97%',
      paddingVertical: 6,
      paddingHorizontal: 16,
    },
    containerExtra:{
      marginTop: 16,
      borderRadius: constants.borderRadius / 1.5,
      width: '97%',
      paddingVertical: 10,
      borderWidth: 2,
      borderColor: newColors.fondo_secundario,
    },
    containerExtraText:{
      color: newColors.fondo_secundario,
      fontSize: 19,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
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
      color: newColors.gris_light,
      fontSize: 14,
    },
    content: {
      marginTop: 8,
      backgroundColor: newColors.gris,
      borderRadius: constants.borderRadius,
      paddingVertical: 8,
      paddingHorizontal: 5,
      width: '100%',
    },
    lotTitle: {
      color: newColors.fondo_principal,
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
      borderRadius: constants.borderRadius,
      backgroundColor: newColors.verde_light,
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