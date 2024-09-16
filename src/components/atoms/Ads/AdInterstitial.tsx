import {
	InterstitialAd,
	AdEventType,
	TestIds,
} from 'react-native-google-mobile-ads';

const interstitialAd = InterstitialAd.createForAdRequest(
	__DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8155583899840720/8620006521',
);

interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
	console.log('Interstitial ad loaded');
	interstitialAd.show();
});

interstitialAd.load();
