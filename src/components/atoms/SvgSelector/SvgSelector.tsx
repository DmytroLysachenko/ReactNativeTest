import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ColoringPage } from '@/screens/ColoringPage/ColoringPage';

export default function SvgSelector({
	onSelectPage,
	pages,
	setPathColors,
}: {
	onSelectPage: (svg: ColoringPage) => void;
	pages: ColoringPage[];
	setPathColors: (obj: Record<string, string>) => void;
}) {
	return (
		<View style={styles.container}>
			{pages.map(page => (
				<TouchableOpacity
					key={page.id}
					style={styles.button}
					onPress={() => {
						onSelectPage(page);
						setPathColors({});
					}}
				>
					<Text style={styles.buttonText}>{page.name}</Text>
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
