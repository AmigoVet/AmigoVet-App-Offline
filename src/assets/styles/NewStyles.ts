import { StyleSheet } from "react-native";
import { getDynamicColors, newColors } from "./colors";
import { constants } from "./constants";

export const createNewStyles = () => {

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: newColors.fondo_principal,
      padding: 20,
      paddingBottom: 40,
    },
    imageContainer: {
      alignItems: "center",
      marginBottom: 20,
      borderColor: newColors.fondo_secundario,
      borderWidth: 2,
      borderRadius: constants.borderRadius / 2,
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
