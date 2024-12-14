import { StyleSheet } from "react-native";
import { getDynamicColors } from "./colors";

export const createNewStyles = (isDarkTheme: boolean) => {
  const colors = getDynamicColors(isDarkTheme); // Obtén colores dinámicos

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.fondo,
      padding: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: colors.blancoLight,
    },
    imageContainer: {
      alignItems: "center",
      marginBottom: 20,
      borderColor: colors.naranja,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 15,
    },
    imageButtonContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    imageButton: {
      marginHorizontal: 20,
      padding: 10,
      borderRadius: 5,
    },
  });
};
