import React from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import CustomImage from './CustomImage';

interface CarouselProps {
    sources: (string | undefined)[];
}

const CarouselImages = ({ sources }: CarouselProps) => {
    const windowWidth = Dimensions.get('window').width;

    // Filtrar imágenes válidas (no undefined o strings vacías)
    const validSources = sources.filter((source) => source && source.trim() !== '');

    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={validSources}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                decelerationRate="fast"
                snapToInterval={windowWidth}
                contentContainerStyle={styles.flatListContent}
                style={{ width: windowWidth }}
                renderItem={({ item }) => (
                    <View style={[styles.imageContainer, { width: windowWidth }]}>
                        <CustomImage source={item!} full />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -15,
    },
    flatListContent: {
        padding: 0,
        margin: 0,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CarouselImages;
