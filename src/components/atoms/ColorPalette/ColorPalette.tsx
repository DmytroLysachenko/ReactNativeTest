import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ColorPalette: React.FC = ({onSelectColor}) => {
  const colors = [
    { name: 'Red', color: [255, 0, 0, 0.5] },          // Half-transparent red
    { name: 'Green', color: [0, 255, 0, 0.5] },        // Half-transparent green
    { name: 'Blue', color: [0, 0, 255, 0.5] },         // Half-transparent blue
    { name: 'Yellow', color: [255, 255, 0, 0.5] },     // Half-transparent yellow
    { name: 'Cyan', color: [0, 255, 255, 0.5] },       // Half-transparent cyan
    { name: 'Magenta', color: [255, 0, 255, 0.5] },    // Half-transparent magenta
    { name: 'Orange', color: [255, 165, 0, 0.5] },     // Half-transparent orange
    { name: 'Purple', color: [128, 0, 128, 0.5] },     // Half-transparent purple
    { name: 'Pink', color: [255, 192, 203, 0.5] },     // Half-transparent pink
    { name: 'Lime', color: [0, 255, 0, 0.5] },         // Half-transparent lime
    { name: 'Teal', color: [0, 128, 128, 0.5] },       // Half-transparent teal
    { name: 'Brown', color: [165, 42, 42, 0.5] },      // Half-transparent brown
    { name: 'Gray', color: [128, 128, 128, 0.5] },     // Half-transparent gray
    { name: 'Indigo', color: [75, 0, 130, 0.5] },      // Half-transparent indigo
    { name: 'Violet', color: [238, 130, 238, 0.5] },   // Half-transparent violet
    { name: 'Turquoise', color: [64, 224, 208, 0.5] }, // Half-transparent turquoise
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {colors.map((item, index) => (
        <TouchableOpacity key={index} style={[styles.colorBox, { backgroundColor: item.color }]} onPress={() => console.log(item.color);
            onSelectColor(item.color)
        }>
          <Text style={styles.colorText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  colorBox: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  colorText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ColorPalette;
