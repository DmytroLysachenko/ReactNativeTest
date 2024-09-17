import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from './navigators/Application';
import './translations';
import { useEffect, useState } from 'react';
import { initializeDatabase } from './database/initDatabase';
import {
	InterstitialAd,
	RewardedAd,
	RewardedAdReward,
} from 'react-native-google-mobile-ads';
import AdProvider from './ads/AdsProvider';
import {
	initializeInterstitialAd,
	initializeRewardAd,
} from './services/ads/initializeAds';

export const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
	const [isInterstitialLoaded, setIsInterstitialLoaded] = useState(false);
	const [interstitialAd, setIntersstitialAd] = useState<InterstitialAd | null>(
		null,
	);
	const [isRewardedLoaded, setIsRewardedLoaded] = useState(false);
	const [rewardedAd, setRewardedAd] = useState<RewardedAd | null>(null);
	const [reward, setReward] = useState<null | RewardedAdReward>(null);

	useEffect(() => {
		initializeInterstitialAd(setIsInterstitialLoaded, setIntersstitialAd);

		initializeRewardAd(setIsRewardedLoaded, setReward, setRewardedAd);

		try {
			initializeDatabase();
		} catch (error) {
			console.error('Data base initialization error:', error);
		}

		return () => {
			if (interstitialAd !== null) {
				interstitialAd.removeAllListeners();
			}

			if (rewardedAd !== null) {
				rewardedAd.removeAllListeners();
			}
		};
	}, []);

	// Function to show Interstitial Ad
	const showInterstitialAd = () => {
		if (isInterstitialLoaded && interstitialAd) {
			interstitialAd.show();
		} else {
			console.log('Interstitial ad is not loaded yet');
		}
	};

	// Function to show Rewarded Ad
	const showRewardedAd = () => {
		if (isRewardedLoaded && rewardedAd) {
			rewardedAd.show();
		} else {
			console.log('Rewarded ad is not loaded');
		}
	};

	useEffect(() => {}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider storage={storage}>
				<AdProvider
					showRewardedAd={showRewardedAd}
					showInterstitialAd={showInterstitialAd}
				>
					<ApplicationNavigator />
				</AdProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
