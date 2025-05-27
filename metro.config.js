const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('stream-http'),
      crypto: require.resolve('crypto-browserify'),
      events: require.resolve('events'),
      url: require.resolve('react-native-url-polyfill'),
      net: require.resolve('react-native-tcp-socket'),
      tls: require.resolve('react-native-tcp-socket'),
      zlib: require.resolve('browserify-zlib'),
      util: require.resolve('util'),
      assert: require.resolve('assert'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);