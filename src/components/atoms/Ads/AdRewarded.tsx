import {
	RewardedAd,
	AdEventType,
	RewardedAdEventType,
	TestIds,
} from 'react-native-google-mobile-ads';
import { useEffect } from 'react';

const rewardedAd = RewardedAd.createForAdRequest(
	__DEV__ ? TestIds.REWARDED : 'ca-app-pub-8155583899840720/1275298150',
);

const showRewardedAd = () => {
	rewardedAd.addAdEventListener(AdEventType.LOADED, () => {
		console.log('Rewarded ad loaded');
		rewardedAd.show();
	});

	rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
		console.log('Rewarded ad closed');
	});

	rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
		console.log('User earned reward of ', reward);
		// Handle reward logic here
	});

	rewardedAd.addAdEventListener(AdEventType.ERROR, error => {
		console.error('Rewarded ad failed to load: ', error);
	});

	// Load the ad
	rewardedAd.load();
};

// Example of using useEffect to load the ad when the component mounts
useEffect(() => {
	showRewardedAd();
}, []);
