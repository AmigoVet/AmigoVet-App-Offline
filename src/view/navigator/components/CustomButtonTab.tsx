import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { newColors } from '../../styles/colors';

const CustomButtonTab = (props: any) => {
    const { route, children, accessibilityState, onPress } = props;

    if (accessibilityState.selected) {
        return (
            <View style={styles.btnWrapper}>
                {/* SVG Divider */}
                <View style={styles.svgWrapper}>
                    <Svg
                        data-name="Layer 1"
                        preserveAspectRatio="none"
                        viewBox="0 0 1200 120"
                        style={styles.svgBackground}
                    >
                        <Path
                            d="M600 80C300 80 50 50 0 20V120h1200V20c-50 30-300 60-600 60Z"
                            fill={newColors.fondo_secundario}
                            stroke='none'
                        />
                    </Svg>
                </View>

                {/* Active Button */}
                <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.activeBtn}>
                    <Text>{children}</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.inactiveBtn}>
                <Text>{children}</Text>
            </TouchableOpacity>
        );
    }
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
    svgBackground: {
        width: '100%',
        height: 65,
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
    inactiveBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: newColors.fondo_secundario,
    },
});
