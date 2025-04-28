import { StyleSheet } from "react-native";
import { newColors } from "../../../../styles/colors";
import { constants } from "../../../../styles/constants";

export const styleSections = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: newColors.fondo_secundario,
  paddingVertical: 10,
},
title: {
  fontSize: 16,
  fontWeight: 'bold',
  color: newColors.fondo_principal,
  borderBottomWidth: 1,
  borderColor: newColors.fondo_principal,
  alignSelf: 'center',
  marginBottom: 10,
  fontFamily: constants.FontTitle
},
noDataText: {
  fontSize: 14,
  color: newColors.fondo_principal,
  textAlign: 'center',
  marginTop: 10,
  fontFamily: constants.FontText
},
itemContainer: {
  width: '90%',
  padding: 10,
  marginVertical: 5,
  backgroundColor: newColors.fondo_principal,
  borderRadius: 5,
},
})