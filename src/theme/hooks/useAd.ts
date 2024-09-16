import { useContext } from 'react';
import { AdsContext } from '@/ads/AdsProvider';

const useAds = () => {
	const context = useContext(AdsContext);

	if (context === undefined) {
		throw new Error('useAds must be used within a AdsProvider');
	}

	return context;
};

export default useAds;
