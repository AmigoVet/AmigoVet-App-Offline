import { StyleSheet } from "react-native";
import { newColors } from "../../../../../assets/styles/colors";

export const EditDataEstyles = StyleSheet.create({
    button: {
        backgroundColor: newColors.verde,
        position: 'absolute',
        zIndex: 10,
        bottom: 140,
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
        zIndex: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
        borderColor: newColors.verde,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 15,
    },
    image: {
        height: 250,
        width: '100%',
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
    noImageText: {
        fontSize: 16,
        color: newColors.fondo_principal,
        marginBottom: 10,
    },
    modalActions: {
        width: '100%',
        alignItems: 'center',
    },
});