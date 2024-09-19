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
	useEffect(() => {
		try {
			initializeDatabase();
		} catch (error) {
			console.error('Data base initialization error:', error);
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider storage={storage}>
				<AdProvider>
					<ApplicationNavigator />
				</AdProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
