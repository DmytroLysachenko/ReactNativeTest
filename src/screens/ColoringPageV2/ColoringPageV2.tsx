import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Canvas, Path, useImage, Image as SkiaImage, Group, Skia } from '@shopify/react-native-skia';
import { PanResponder } from 'react-native';
import ColorPicker, { useColorPickerValue } from 'reanimated-color-picker'; // Using reanimated-color-picker
import CustomColorPicker from '@/components/atoms/ColorPicker/ColorPicker';

export type ColoringPage = {
	ID: number;
	name: string;
	link: string;
};

function ColoringPageV2() {
	// Load your image as SkiaImage
	const image = useImage(require('./assets/coloring-page.png')); // Replace with your PNG image
	const [paths, setPaths] = useState([]); // Store paths for drawing
	const color = useColorPickerValue('color'); // Using the color picker value
  
	// Paint properties
	const paint = Skia.Paint();
	paint.setColor(color.hex);
	paint.setStyle(1);
	paint.setStrokeWidth(10);
	paint.setAlphaf(0.5); // Transparency to keep the outline visible
  
	// Handle drawing
	const panResponder = PanResponder.create({
	  onStartShouldSetPanResponder: () => true,
	  onPanResponderMove: (event, gestureState) => {
		const { locationX, locationY } = event.nativeEvent;
		setPaths((prevPaths) => [
		  ...prevPaths,
		  { path: `L ${locationX} ${locationY}`, color: color.hex }, // Capture the path
		]);
	  },
	  onPanResponderRelease: () => {
		setPaths([]);
	  },
	});
  
	if (!image) {
	  return null; // Return a placeholder or loading state until the image is loaded
	}
  
	return (
	  <View style={styles.container} {...panResponder.panHandlers}>
		<CustomColorPicker onSelectColor={color => paint.setColor(color.hex)} selectedColor={color.hex}/>
		<Canvas style={styles.canvas}>
		  <Group>
			{/* Render the background PNG image */}
			<SkiaImage image={image} x={0} y={0} width={300} height={400} />
  
			{/* Render the user's brush strokes */}
			{paths.map((path, index) => (
			  <Path key={index} path={`M 0 0 ${path.path}`} paint={paint} />
			))}
		  </Group>
		</Canvas>
	  </View>
	);
  };
  
  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	},
	canvas: {
	  flex: 1,
	},
  });

export default ColoringPageV2;
