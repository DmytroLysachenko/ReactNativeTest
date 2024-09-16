import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeScreen } from '@/components/template';
import CustomColorPicker from '@/components/atoms/ColorPicker/ColorPicker';
import ColoringSVG from '@/components/atoms/ColoringSVG/ColoringSVG';
import SvgSelector from '@/components/atoms/SvgSelector/SvgSelector';
import { getAllPages } from '@/database/operations';
import AdBanner from '@/components/atoms/Ads/AdBanner';
import useAds from '@/theme/hooks/useAd';

export type ColoringPage = {
	ID: number;
	name: string;
	link: string;
};

function ColoringPage() {
	const [selectedColor, setSelectedColor] = useState('#ffffff');
	const [pathColors, setPathColors] = useState<Record<string, string>>({});
	const [pages, setPages] = useState<ColoringPage[]>([]);
	const [selectedPage, setSelectedPage] = useState<ColoringPage>();

	const { showRewardedAd, showInterstitialAd } = useAds();

	const onSelectColor = ({ hex }: { hex: string }) => {
		setSelectedColor(hex);
		showInterstitialAd();
	};

	const handlePathPress = (pathId: string) => {
		setPathColors({
			...pathColors,
			[pathId]: selectedColor,
		});
		showRewardedAd();
	};

	useEffect(() => {
		getAllPages(pages => {
			if (pages.length > 0) {
				setPages(pages);
				setSelectedPage(pages[0]);
			} else {
				console.log('No pages found');
			}
		});
	}, []);

	return (
		<SafeScreen>
			<ScrollView>
				<AdBanner />
				<CustomColorPicker
					onSelectColor={onSelectColor}
					selectedColor={selectedColor}
				/>

				{pages && pages.length > 0 && selectedPage && (
					<>
						<ColoringSVG
							pathColors={pathColors}
							handlePathPress={handlePathPress}
							url={selectedPage.link}
						/>
						<SvgSelector
							onSelectPage={setSelectedPage}
							pages={pages}
							setPathColors={setPathColors}
						/>
					</>
				)}
			</ScrollView>
		</SafeScreen>
	);
}

export default ColoringPage;
