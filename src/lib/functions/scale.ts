import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

// Dimensiones de pantalla base para el diseño
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dimensiones de diseño base (las que usaste al diseñar la app)
const BASE_WIDTH = 375; // Ancho estándar de diseño (iPhone 6/7/8)
const BASE_HEIGHT = 812; // Alto estándar de diseño (iPhone X)

// Ratio para calcular tamaños responsivos
const widthRatio = SCREEN_WIDTH / BASE_WIDTH;
const heightRatio = SCREEN_HEIGHT / BASE_HEIGHT;

// Función para escalar tamaños de fuente de manera responsiva
export function scale(size) {
  const newSize = size * widthRatio;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } 
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2; // Ajuste para Android
}

// Función para escalar dimensiones horizontales (ancho, padding, margin horizontal)
export function horizontalScale(size) {
  return size * widthRatio;
}

// Función para escalar dimensiones verticales (alto, padding, margin vertical)
export function verticalScale(size) {
  return size * heightRatio;
}

// Función para escalar dimensiones moderadamente (mejor para algunos márgenes y paddings)
export function moderateScale(size, factor = 0.5) {
  return size + (scale(size) - size) * factor;
}

// Función para obtener una altura segura considerando notches y barras de estado
export function getSafeAreaHeight() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const screenHeight = Dimensions.get('window').height;
  const safeHeight = screenHeight - statusBarHeight;
  return safeHeight;
}

// Constantes para tamaños de fuente
export const FONT_SIZES = {
  xs: scale(10),
  sm: scale(12),
  md: scale(14),
  lg: scale(16),
  xl: scale(18),
  xxl: scale(20),
  xxxl: scale(24),
  title: scale(28),
  largeTitle: scale(34),
};

// Constantes para espaciado
export const SPACING = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(40),
};