import layout from '@/theme/layout';
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import ColorPicker, {
	HueSlider,
	OpacitySlider,
	Panel1,
} from 'reanimated-color-picker';

export default function CustomColorPicker({
	onSelectColor,
	selectedColor,
}: {
	onSelectColor: ({ hex }: { hex: string }) => void;
	selectedColor: string;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<View
			style={{
				flex: 1,
				position: 'relative',
				height: 300,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text style={{ fontSize: 18, marginBottom: 10 }}>
				Selected Color: {selectedColor}
			</Text>
			<View
				style={{
					height: 150,
					width: 150,
					backgroundColor: selectedColor,
					marginBottom: 20,
				}}
			/>

			{/* Color Picker Component */}
			{isOpen && (
				<View
					style={[
						{
							top: 40,
							backgroundColor: 'linen',
							paddingVertical: 20,
							paddingHorizontal: 10,
							borderRadius: 15,
						},
						layout.absolute,
						layout.z10,
					]}
				>
					<Button title="Close Selector" onPress={() => setIsOpen(false)} />
					<ColorPicker
						onComplete={onSelectColor}
						value={selectedColor}
						style={{
							height: 300,
							width: 300,
							padding: 20,
							paddingBottom: 300,
						}}
					>
						<OpacitySlider style={{ padding: 20 }} />
						<HueSlider style={{ marginTop: 20, padding: 20 }} />
						<Panel1
							style={{
								marginTop: 20,
							}}
						/>
					</ColorPicker>
				</View>
			)}

			{/* Optional Button to confirm selection */}
			{!isOpen && (
				<Button title="Select Color" onPress={() => setIsOpen(true)} />
			)}
		</View>
	);
}
