import React, { useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Text, FlatList, Dimensions } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { newColors } from '../../../../assets/styles/colors';
import { CustomIcon, CustomImage } from '../../../../components/Customs';
import { RootStackParamList } from '../../../Welcome';
import Iconlogo from '../../../../assets/svgs/Iconlogo';
import { constants } from '../../../../assets/styles/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.85;
const ITEM_HEIGHT = 250;

interface HeaderProps {
  title: string;
  id: string;
  image1: string;
  image2?: string;
  image3?: string;
}

const Header = ({ 
  title = "Datos del animal", 
  id = "Sin identificador", 
  image1, 
  image2, 
  image3 
}: HeaderProps) => {
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
          <CustomIcon 
            name="chevron-back-outline" 
            size={25} 
            color={newColors.fondo_principal} 
          />
        </Pressable>
        
        <View>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle}>{id}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Iconlogo fill={newColors.fondo_principal} />
        </View>
      </View>

      {images.length > 0 && (
        <View style={styles.imageContainer}>
          <View style={styles.imageContainerContainer}>
            <FlatList
              data={images}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={ITEM_WIDTH}
              decelerationRate="fast"
              viewabilityConfig={viewabilityConfig}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              onViewableItemsChanged={onViewableItemsChanged}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
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
  },
  iconContainer: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: newColors.fondo_principal,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '300',
    color: newColors.fondo_principal,
    textAlign: 'center',
  },
  imageContainer: {
    zIndex: 10,
    marginTop: -40,
    height: ITEM_HEIGHT + 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainerContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    padding: 10,
    backgroundColor: newColors.fondo_principal,
    borderRadius: constants.borderRadius,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: ITEM_WIDTH - 20,
    height: ITEM_HEIGHT - 20,
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
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

export default Header;
