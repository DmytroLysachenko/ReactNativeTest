import { createContext } from 'react';

type ContextProps = {
	children: JSX.Element;
	showRewardedAd: () => void;
	showInterstitialAd: () => void;
};

export const AdsContext = createContext<any>(undefined);

function AdProvider({
	children,
	showRewardedAd,
	showInterstitialAd,
}: ContextProps) {
	const value = {
		showRewardedAd,
		showInterstitialAd,
	};
	return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
}

export default AdProvider;
