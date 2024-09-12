import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeScreen } from '@/components/template';
import CustomColorPicker from '@/components/atoms/ColorPicker/ColorPicker';
import { ColoringSVG } from '@/components/atoms/ColoringSVG/ColoringSVG';
import SvgSelector from '@/components/atoms/SvgSelector/SvgSelector';

const svgList = {
	'Rabbit & box turtle':
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/183091/harper-coloring-book001.svg',

	Mandrills:
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/183091/harper-coloring-book002.svg',

	'Painted bunting':
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/183091/harper-coloring-book003.svg',

	'Emerald toucanet':
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/183091/harper-coloring-book004.svg',

	Cardinal:
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/183091/harper-coloring-book005.svg',
};

export type SvgNames = [keyof typeof svgList];

function ColoringPage() {
	const [selectedColor, setSelectedColor] = useState('#ffffff');
	const [pathColors, setPathColors] = useState<Record<string, string>>({});
	const [selectedSvg, setSelectedSvg] = useState<keyof typeof svgList>(
		'Rabbit & box turtle',
	);

	const onSelectColor = ({ hex }: { hex: string }) => {
		// do something with the selected color.
		setSelectedColor(hex);
	};

	const handlePathPress = (pathId: string) => {
		setPathColors({
			...pathColors,
			[pathId]: selectedColor,
		});
	};

	return (
		<SafeScreen>
			<ScrollView>
				<CustomColorPicker
					onSelectColor={onSelectColor}
					selectedColor={selectedColor}
				/>
				<ColoringSVG
					pathColors={pathColors}
					handlePathPress={handlePathPress}
					url={svgList[selectedSvg]}
				/>
				<SvgSelector
					onSelectSvg={setSelectedSvg}
					svgList={Object.keys(svgList) as SvgNames}
					setPathColors={setPathColors}
				/>
			</ScrollView>
		</SafeScreen>
	);
}

export default ColoringPage;
