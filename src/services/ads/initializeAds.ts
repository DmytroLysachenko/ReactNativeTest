import {
	AdEventType,
	InterstitialAd,
	RewardedAd,
	RewardedAdEventType,
	TestIds,
} from 'react-native-google-mobile-ads';

const interstitialAdUnitId = __DEV__
	? TestIds.INTERSTITIAL
	: process.env.INTERSTITIAL_AD
	? process.env.INTERSTITIAL_AD
	: TestIds.INTERSTITIAL;

const rewardedAdUnitId = __DEV__
	? TestIds.REWARDED
	: process.env.REWARDED_AD
	? process.env.REWARDED_AD
	: TestIds.REWARDED;

export const initializeInterstitialAd = (
	setIsInterstitialLoaded: (value: boolean) => void,
	setIntersstitialAd: (ad: InterstitialAd) => void,
) => {
	const interstitialAd = InterstitialAd.createForAdRequest(
		interstitialAdUnitId,
		{
			requestNonPersonalizedAdsOnly: true,
		},
	);

	// Load Interstitial Ad
	const loadInterstitialAd = () => {
		interstitialAd.load();

		interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
			setIsInterstitialLoaded(true);
			console.log('Interstitial ad loaded');
		});

		interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
			setIsInterstitialLoaded(false);
			console.log('Interstitial ad closed');
			interstitialAd.load(); // Preload next ad
		});

		interstitialAd.addAdEventListener(AdEventType.ERROR, error => {
			if (error.code === 'googleMobileAds/no-fill') {
				// Handle no-fill gracefully
				console.log('No ad available to fill the request');
			} else {
				console.error('Interstitial ad failed to load: ', error);
			}
		});
	};
	setTimeout(() => {
		loadInterstitialAd();
		setIntersstitialAd(interstitialAd);
	}, 10000);
};

export const initializeRewardAd = (
	setIsRewardedLoaded: (value: boolean) => void,
	setRewardedAd: (ad: RewardedAd) => void,
) => {
	const rewardedAd = RewardedAd.createForAdRequest(rewardedAdUnitId, {
		requestNonPersonalizedAdsOnly: true,
	});

	// Load Rewarded Ad
	const loadRewardedAd = () => {
		rewardedAd.load();

		rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
			setIsRewardedLoaded(true);
			console.log('Rewarded ad loaded');
		});

		rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
			console.log('User earned reward: ', reward);
		});

		rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
			setIsRewardedLoaded(false);
			console.log('Rewarded ad closed');
			rewardedAd.load(); // Preload next ad
		});

		rewardedAd.addAdEventListener(AdEventType.ERROR, error => {
			if (error.code === 'googleMobileAds/no-fill') {
				// Handle no-fill gracefully
				console.log('No ad available to fill the request');
			} else {
				console.error('Rewarded ad failed to load: ', error);
			}
		});
	};
	setTimeout(() => {
		loadRewardedAd();
		setRewardedAd(rewardedAd);
	}, 10000);
};
