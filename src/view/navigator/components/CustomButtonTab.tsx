import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { newColors } from '../../styles/colors';
import { useRoute, useNavigation } from '@react-navigation/native';

interface CustomButtonTabProps {
    children: React.ReactNode;
    onPress?: () => void;
    route: string; // El nombre de la ruta que pasas desde MainTabs
}

const CustomButtonTab = (props: CustomButtonTabProps) => {
    const { children, onPress, route: routeName } = props;
    const currentRoute = useRoute();
    const navigation = useNavigation();
    const isIOS = Platform.OS === 'ios';
    
    // Obtener el estado del navegador para saber qué tab está activo
    const state = navigation.getState();
    const activeTabIndex = state!.index;
    const activeRouteName = state!.routes[activeTabIndex].name;
    
    // Determinar si este tab está activo comparando nombres de ruta
    const isSelected = activeRouteName === getRouteNameFromCustomName(routeName);

    if (isSelected) {
        return (
            <View style={styles.btnWrapper}>
                {/* SVG Divider */}
                <View style={[styles.svgWrapper, isIOS && styles.svgWrapperIOS]}>
                    <Svg
                        data-name="Layer 1"
                        preserveAspectRatio="none"
                        viewBox="0 0 1200 120"
                        style={[styles.svgBackground, isIOS && styles.svgBackgroundIOS]}
                    >
                        <Path
                            d="M600 80C300 80 50 50 0 20V120h1200V20c-50 30-300 60-600 60Z"
                            fill={newColors.fondo_secundario}
                            stroke='none'
                        />
                    </Svg>
                </View>

                {/* Active Button */}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPress}
                    style={[styles.activeBtn, isIOS && styles.activeBtnIOS]}
                >
                    <Text style={styles.activeText}>{children}</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.inactiveBtn}>
                <Text style={styles.inactiveText}>{children}</Text>
            </TouchableOpacity>
        );
    }
};

// Función helper para mapear los nombres personalizados a los nombres reales de las rutas
const getRouteNameFromCustomName = (customName: string): string => {
    const routeMap: { [key: string]: string } = {
        'Inicio': 'Home',
        'Local': 'Local',
        'Agregar': 'New',
        'Web': 'Feed',
        'Perfil': 'Profile'
    };
    return routeMap[customName] || customName;
};

export default CustomButtonTab;

const styles = StyleSheet.create({
    btnWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    svgWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
        zIndex: -1,
    },
    svgWrapperIOS: {
        height: 50,
        bottom: 0,
    },
    svgBackground: {
        width: '100%',
        height: 65,
    },
    svgBackgroundIOS: {
        height: 50,
    },
    activeBtn: {
        position: 'absolute',
        top: -15,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: newColors.verde_light,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    activeBtnIOS: {
        top: -28,
    },
    inactiveBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: newColors.fondo_secundario,
    },
    activeText: {
        color: newColors.fondo_secundario,
        fontWeight: 'bold',
    },
    inactiveText: {
        color: newColors.principal,
    },
});