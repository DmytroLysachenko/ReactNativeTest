import React from 'react';
import { View, Text } from 'react-native';
import {
	BannerAd,
	BannerAdSize,
	TestIds,
} from 'react-native-google-mobile-ads';

export default function AdBanner() {
	const adUnitId = __DEV__
		? TestIds.BANNER
		: 'ca-app-pub-8155583899840720/4204713827';

	// Banner Ad's ID
	return (
		<View>
			<Text>Welcome to AdMob</Text>
			<BannerAd
				unitId={adUnitId}
				size={BannerAdSize.FULL_BANNER}
				requestOptions={{
					requestNonPersonalizedAdsOnly: true,
				}}
				onAdLoaded={() => {
					console.log('Ad loaded!');
				}}
				onAdFailedToLoad={error => {
					console.error('Ad failed to load: ', error);
				}}
			/>
		</View>
	);
}
