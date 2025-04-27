import React, { useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Text, FlatList, Dimensions } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Iconlogo from '../../../../assets/svgs/Iconlogo';
import CustomImage from '../../../../components/customs/CustomImage';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.95;
const ITEM_HEIGHT = 250;

interface HeaderAnimalViewProps {
  title: string;
  id: string;
  image1: string;
  image2?: string;
  image3?: string;
}

const HeaderAnimalView = ({ 
  title = "Datos del animal", 
  id = "Sin identificador", 
  image1, 
  image2, 
  image3 
}: HeaderAnimalViewProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const images = [image1, image2, image3].filter((img): img is string => Boolean(img));

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageWrapper}>
      <CustomImage source={item} style={styles.image} />
    </View>
  );

  const renderDotIndicator = () => {
    if (images.length <= 1) return null;
    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex 
                  ? newColors.verde_light
                  : newColors.fondo_secundario,
                width: index === activeIndex ? 20 : 8,
              }
            ]}
          />
        ))}
      </View>
    );
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconContainer}>
          <Icon 
            name="chevron-back-outline" 
            size={25} 
            color={newColors.fondo_principal} 
          />
        </Pressable>
        
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle}>{id}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Iconlogo fill={newColors.fondo_principal} height={40} width={40} />
        </View>
      </View>

      {images.length > 0 && (
        <View style={styles.imageContainer}>
          <FlatList
            data={images}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.flatListContent}
          />
          {renderDotIndicator()}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-start', 
    justifyContent: 'space-between', 
    backgroundColor: newColors.fondo_secundario,
    borderBottomLeftRadius: constants.borderRadius,
    borderBottomRightRadius: constants.borderRadius,
    zIndex: 10,
    paddingHorizontal: 10,
    paddingTop: 10, 
    gap: 20, 
  },
  iconContainer: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start', 
  },
  textContainer: {
    flexShrink: 1, 
    alignItems: 'center', 
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: newColors.fondo_principal,
    textAlign: 'center',
    fontFamily: constants.FontTitle
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '300',
    color: newColors.fondo_principal,
    textAlign: 'center',
    fontFamily: constants.FontTitle
  },
  imageContainer: {
    zIndex: 10,
    marginTop: -45,
    width: '100%',
    height: ITEM_HEIGHT + 20,
    alignItems: 'center',
  },
  flatListContent: {
    paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
  },
  imageWrapper: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: newColors.fondo_principal,
    borderRadius: constants.borderRadius,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: constants.borderRadius,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

export default HeaderAnimalView;