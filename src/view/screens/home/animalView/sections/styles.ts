import { StyleSheet } from 'react-native';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';

export const styleSections = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: newColors.fondo_secundario,
  paddingVertical: 10,
  minHeight: 500,
  paddingBottom: 100,
},
header: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
},
content:{
  width: '100%',
  flex: 1,
  alignItems: 'flex-start',
  paddingVertical: 10,
  paddingHorizontal: 20,
  },
title: {
  fontSize: 16,
  fontWeight: 'bold',
  color: newColors.fondo_principal,
  borderBottomWidth: 1,
  borderColor: newColors.fondo_principal,
  alignSelf: 'center',
  marginBottom: 10,
  fontFamily: constants.FontTitle,
},
noDataText: {
  fontSize: 14,
  color: newColors.fondo_principal,
  textAlign: 'center',
  marginTop: 10,
  fontFamily: constants.FontText,
},
itemContainer: {
  width: '90%',
  padding: 10,
  marginVertical: 5,
  backgroundColor: newColors.fondo_principal,
  borderRadius: 5,
},
buttonsContainer: {
  flexDirection: 'row',
  gap: 5,
},
tableContainer: {
  width: '100%',
  padding: 10,

}
});
