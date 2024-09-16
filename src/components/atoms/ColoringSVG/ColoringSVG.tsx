import { parseSvg } from '@/services/svgs/parseSvg';
import React, { useEffect, useState } from 'react';

import Svg, { Path } from 'react-native-svg';

export default function ColoringSVG({
	pathColors,
	handlePathPress,
	url,
}: {
	pathColors: Record<string, string>;
	handlePathPress: (arg: string) => void;
	url: string;
}) {
	const [svgContent, setSvgContent] = useState<string>('');

	const fetchSVG = async (url: string) => {
		try {
			const response = await fetch(url);
			const text = await response.text();
			setSvgContent(text);
		} catch (error) {
			console.error('Error fetching SVG:', error);
		}
	};

	useEffect(() => {
		if (url) {
			fetchSVG(url);
		}
	}, [url]);

	const svgElement = parseSvg(svgContent);

	return (
		svgElement && (
			<Svg style={{ height: 500 }} viewBox={svgElement.attributes.viewBox}>
				{svgElement.paths.map((path, index) => (
					<Path
						key={path.attributes.d + index}
						fill={pathColors[`path${index}`] ?? path.attributes.fill}
						d={path.attributes.d}
						onPress={() => {
							handlePathPress(`path${index}`);
						}}
					/>
				))}
			</Svg>
		)
	);
}
