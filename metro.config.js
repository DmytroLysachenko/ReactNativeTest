const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	transformer: {
		babelTransformerPath: require.resolve('react-native-svg-transformer'), // SVG transformer
	},
	resolver: {
		assetExts: ['bin', 'txt', 'jpg', 'png', 'ttf', 'otf', 'json'], // Allow other assets
		sourceExts: ['js', 'jsx', 'ts', 'tsx', 'svg', 'json'], // Add 'svg' for direct imports
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
