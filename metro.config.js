const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // Soporte para SVG
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'), // Elimina SVG de assets
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'], // Agrega SVG como fuente
  },
};

module.exports = mergeConfig(defaultConfig, customConfig);
