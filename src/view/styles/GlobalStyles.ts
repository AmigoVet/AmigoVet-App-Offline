import { StyleSheet } from "react-native";
import { newColors } from "./colors";

export const GlobalStyles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Chillax'
    },
    subtitle:{
        fontSize: 16,
        fontFamily: 'Synonym-Regular'
    },
    miniText: {
        fontSize: 12,
        fontWeight: 'medium',
        color: newColors.fondo_secundario,
      },
});