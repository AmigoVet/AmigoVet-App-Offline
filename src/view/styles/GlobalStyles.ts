import { StyleSheet } from 'react-native';
import { newColors } from './colors';
import { constants } from './constants';

export const GlobalStyles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Chillax',
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
    modalContainer: {
        backgroundColor: newColors.fondo_principal,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignContent: 'center',
        alignItems: 'center',
        borderBottomColor: newColors.fondo_secundario,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderRadius: constants.borderRadius,
    },
    padding20:{
        padding: 20,
    },
});
