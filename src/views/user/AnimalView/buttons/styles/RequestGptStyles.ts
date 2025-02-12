import { StyleSheet } from "react-native";
import { newColors } from "../../../../../assets/styles/colors";
import { constants } from "../../../../../assets/styles/constants";

export const requestGptStyles = StyleSheet.create({
  button: {
    backgroundColor: newColors.verde,
    position: 'absolute',
    zIndex: 10,
    bottom: 20,
    right: 20,
    borderRadius: 50,
    padding: 10,
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: newColors.fondo_principal,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    maxWidth: '99.9%',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
  },
  container: {
    flex: 1,
    minHeight: 300,
    maxHeight: 600,
    borderWidth: 1,
    borderColor: newColors.verde,
    borderRadius: constants.borderRadius,
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    fontSize: 12,
    alignSelf: 'flex-end',
    backgroundColor: newColors.verde_light,
  },
  gptMessage: {
    alignSelf: 'flex-start',
    backgroundColor: newColors.fondo_secundario,
  },
  messageText: {
    color: newColors.fondo_secundario,
    fontSize: 12,
  },
  userText:{
    color: newColors.fondo_secundario,
    fontSize: 14
  },
  gptText:{
    color: newColors.principal,
    fontSize: 14
  }
});