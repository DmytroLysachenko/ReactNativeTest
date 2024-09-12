import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SvgNames } from '@/screens/ColoringPage/ColoringPage';

export default function SvgSelector({
	onSelectSvg,
	svgList,
	setPathColors,
}: {
	onSelectSvg: (
		svgName:
			| 'Rabbit & box turtle'
			| 'Mandrills'
			| 'Painted bunting'
			| 'Emerald toucanet'
			| 'Cardinal',
	) => void;
	svgList: SvgNames;
	setPathColors: (obj: Record<string, string>) => void;
}) {
	return (
		<View style={styles.container}>
			{svgList.map(svgName => (
				<TouchableOpacity
					key={svgName}
					style={styles.button}
					onPress={() => {
						onSelectSvg(svgName), setPathColors({});
					}}
				>
					<Text style={styles.buttonText}>{svgName}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		marginVertical: 20,
		justifyContent: 'center',
	},
	button: {
		backgroundColor: '#ddd',
		padding: 10,
		marginHorizontal: 10,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 16,
		color: '#333',
	},
});

//  {
// 	onSelectSvg: (svg: string) => void;
// 	svgList:
// 	setPathColors;
// }
