import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView, PanResponder, GestureResponderEvent, PanResponderGestureState, Button } from 'react-native';
import { Canvas, Path, SkPath, Skia, SkiaDomView } from '@shopify/react-native-skia';
import { Text } from 'react-native-svg';



const { width } = Dimensions.get('window');

const colors = [
  'rgba(255, 0, 0, 0.5)',  // Half-transparent red
  'rgba(0, 255, 0, 0.5)',  // Half-transparent green
  'rgba(0, 0, 255, 0.5)',  // Half-transparent blue
  'rgba(255, 255, 0, 0.5)', // Half-transparent yellow
  'rgba(0, 255, 255, 0.5)', // Half-transparent cyan
  'rgba(255, 0, 255, 0.5)', // Half-transparent magenta
  'rgba(255, 165, 0, 0.5)', // Half-transparent orange
  'rgba(128, 0, 128, 0.5)', // Half-transparent purple
  'rgba(255, 192, 203, 0.5)', // Half-transparent pink
];
const sizes = [1,2,5,10,15,20]

function ColoringPageV2() {
	const [selectedColor, setSelectedColor] = useState<string>('rgba(0, 0, 0, 0.5)');
	const [selectedSize, setSelectedSize] = useState<number>(1)
  const [paths, setPaths] = useState<{ path: SkPath; color: string, width: number }[]>([]);
  const [currentPath, setCurrentPath] = useState<SkPath | null>(null);

  const createNewPath = (x: number, y: number): SkPath => {
    const path = Skia.Path.Make();
    path.moveTo(x, y);
    return path;
  };

  const handlePanResponderMove = (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
	console.log(gestureState)
    const { moveX, moveY } = gestureState;
    if (currentPath) {
      currentPath.lineTo(moveX, moveY -66 - selectedSize);
	  console.log('move:',moveX, moveY)
      setCurrentPath(currentPath); // Update the current path
    }
  };

  const handlePanResponderRelease = () => {
    if (currentPath) {
      setPaths((prevPaths) => [...prevPaths, { path: currentPath, color: selectedColor, width: selectedSize }]);
      setCurrentPath(null); // Reset current path after release
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
	  console.log('start:',locationX, locationY)
      const path = createNewPath(locationX, locationY);
      setCurrentPath(path); // Create new path on touch start
    },
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Display PNG outline */}
      <View style={styles.canvasContainer} {...panResponder.panHandlers}>
        <Image
          source={require('@/theme/assets/images/mario-frog-suit-haunted-house-playful-3.png')} // Replace with your actual image path
          style={styles.image}
          resizeMode="contain"
        />

          {/* Skia canvas for drawing */}
		  <SkiaDomView style={styles.skiaCanvas}>
          <Canvas style={{ flex: 1 }}>
            {paths.map((pathObj, index) => (
              <Path
                key={index}
                path={pathObj.path}
                color={pathObj.color}
                style="stroke"
                strokeWidth={pathObj.width}
              />
            ))}
            {currentPath && (
              <Path
                path={currentPath}
                color={selectedColor}
                style="stroke"
                strokeWidth={10}
              />
            )}
          </Canvas>
        </SkiaDomView>
      </View>

      {/* Color Palette */}
      <ScrollView horizontal contentContainerStyle={styles.paletteContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index + 'color'}
            style={[styles.colorCircle, { backgroundColor: color }]}
            onPress={() => {setSelectedColor(color); console.log(color)}}
          />
        ))}
      </ScrollView>
      <ScrollView horizontal contentContainerStyle={styles.paletteContainer}>
        {sizes.map((size, index) => (
          <TouchableOpacity style={styles.textButton} onPress={() => {setSelectedSize(size); console.log(size)}} key={index + 'size'}>
			<Text >{size.toString()} px</Text>
			</TouchableOpacity>
        ))}
      </ScrollView>
	  <Button title='Reset' onPress={()=>setPaths([])}></Button>
    </SafeAreaView>
  );
  };

  const styles = StyleSheet.create({
	container: {
	  flex: 1,

	  backgroundColor: '#f5f5f5',
	},
	canvasContainer: {
	
	  padding: 10,
	 
		marginBottom:40,
	  justifyContent: 'center',
	  alignItems: 'center',
	  position: 'relative',
	},
	image: {
		padding:10,
		zIndex:-10,
	  width: width,
	  height: width,
	},
	skiaCanvas: {
		zIndex:10,
		padding:10,
	  position: 'absolute',
	  width: width,
	  height: width,
	},
	paletteContainer: {
	  flexDirection: 'row',
	  justifyContent: 'center',
	  paddingVertical: 10,
	},
	colorCircle: {
	  width: 40,
	  height: 40,
	  borderRadius: 20,
	  marginHorizontal: 10,
	},
	textButton: {
backgroundColor: 'white',
width: 80,
height:20,
marginHorizontal: 10,	
fontSize: 16,
		color: '#333',
	},

  });


export default ColoringPageV2;
