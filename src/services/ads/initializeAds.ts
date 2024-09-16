import {
	AdEventType,
	InterstitialAd,
	RewardedAd,
	RewardedAdEventType,
	RewardedAdReward,
	TestIds,
} from 'react-native-google-mobile-ads';

const interstitialAdUnitId = __DEV__
	? TestIds.INTERSTITIAL
	: 'ca-app-pub-8155583899840720/8620006521';

const rewardedAdUnitId = __DEV__
	? TestIds.REWARDED
	: 'ca-app-pub-8155583899840720/1275298150';

export const initializeInterstitialAd = (
	setIsInterstitialLoaded: (value: boolean) => void,
	setIntersstitialAd: (ad: InterstitialAd) => void,
) => {
	const interstitialAd =
		InterstitialAd.createForAdRequest(interstitialAdUnitId);

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
			console.error('Interstitial ad failed to load: ', error);
		});
	};

	loadInterstitialAd();
	setIntersstitialAd(interstitialAd);
};

export const initializeRewardAd = (
	setIsRewardedLoaded: (value: boolean) => void,
	setReward: (reward: RewardedAdReward) => void,
	setRewardedAd: (ad: RewardedAd) => void,
) => {
	const rewardedAd = RewardedAd.createForAdRequest(rewardedAdUnitId);

	// Load Rewarded Ad
	const loadRewardedAd = () => {
		rewardedAd.load();

		rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
			setIsRewardedLoaded(true);
			console.log('Rewarded ad loaded');
		});

		rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
			setReward(reward);
			console.log('User earned reward: ', reward);
		});

		rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
			setIsRewardedLoaded(false);
			console.log('Rewarded ad closed');
			rewardedAd.load(); // Preload next ad
		});

		rewardedAd.addAdEventListener(AdEventType.ERROR, error => {
			console.error('Rewarded ad failed to load: ', error);
		});
	};

	loadRewardedAd();
	setRewardedAd(rewardedAd);
};
