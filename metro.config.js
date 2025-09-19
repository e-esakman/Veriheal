const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add Node.js polyfills for React Native compatibility
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  crypto: require.resolve('react-native-get-random-values'),
  stream: require.resolve('readable-stream'),
  buffer: require.resolve('@craftzdog/react-native-buffer'),
  process: require.resolve('process/browser'),
  util: require.resolve('util'),
};

// Ensure proper asset resolution
config.resolver.assetExts.push('bin');

module.exports = config;