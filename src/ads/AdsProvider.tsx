import {
	initializeInterstitialAd,
	initializeRewardAd,
} from '@/services/ads/initializeAds';
import { createContext, useEffect, useState } from 'react';
import { InterstitialAd, RewardedAd } from 'react-native-google-mobile-ads';

type ContextProps = {
	children: JSX.Element;
};

export const AdsContext = createContext<any>(undefined);

function AdProvider({ children }: ContextProps) {
	const [isInterstitialLoaded, setIsInterstitialLoaded] = useState(false);
	const [interstitialAd, setIntersstitialAd] = useState<InterstitialAd | null>(
		null,
	);
	const [isRewardedLoaded, setIsRewardedLoaded] = useState(false);
	const [rewardedAd, setRewardedAd] = useState<RewardedAd | null>(null);

	useEffect(() => {
		initializeInterstitialAd(setIsInterstitialLoaded, setIntersstitialAd);

		initializeRewardAd(setIsRewardedLoaded, setRewardedAd);
	}, []);

	// Function to show Interstitial Ad
	const showInterstitialAd = () => {
		if (isInterstitialLoaded && interstitialAd) {
			interstitialAd.show();
		} else {
			console.log('Interstitial ad is not loaded yet');
			initializeInterstitialAd(setIsInterstitialLoaded, setIntersstitialAd);
		}
	};

	// Function to show Rewarded Ad
	const showRewardedAd = () => {
		if (isRewardedLoaded && rewardedAd) {
			rewardedAd.show();
		} else {
			console.log('Rewarded ad is not loaded');
			initializeRewardAd(setIsRewardedLoaded, setRewardedAd);
		}
	};

	const value = {
		showRewardedAd,
		showInterstitialAd,
	};

	return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
}

export default AdProvider;
