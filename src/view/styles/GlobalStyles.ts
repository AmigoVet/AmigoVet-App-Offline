import { StyleSheet } from "react-native";
import { newColors } from "./colors";
import { constants } from "./constants";

export const GlobalStyles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Chillax'
    },
    subtitle:{
        fontSize: 16,
        fontFamily: constants.FontText,
        fontWeight: '500',
    },
    miniText: {
        fontSize: 12,
        fontWeight: 'medium',
        color: newColors.fondo_secundario,
      },
});