import { StyleSheet } from "react-native";
import { getDynamicColors, newColors } from "./colors";
import { constants } from "./constants";

export const HomeViewStyles = (colors: ReturnType<typeof getDynamicColors>) =>
    StyleSheet.create({
      row: {
        height: 150,
        width: "94%",
        marginVertical: 5,
        borderRadius: constants.borderRadius,
      },
      deleteButton: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: colors.rojo,
      },
      hiddenText: {
        color: 'white',
        fontWeight: 'bold',
      },
      modalContent: {
        flex: 1,
        padding: 20,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      modalId: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      modalActions: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      modalButton: {
        padding: 10,
        borderRadius: constants.borderRadius / 2,
        width: '40%',
        alignItems: 'center',
      },
      modalButtonText: {
        fontWeight: 'bold',
      },
      searchContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10,
        gap: 10,
      },
      customSwitch: {
        flex: 3,
      },
      searchButton: {
        flex: 1,
      },
      loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
      },
      footer: {
        marginVertical: 20,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: newColors.fondo_secundario,
      }
  });