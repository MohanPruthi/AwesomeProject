// src/components/Settings.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTheme1, setTheme2, setTheme3 } from '../../slices/ThemeSlice';

const Settings = () => {
  const [currentTheme, setCurrentTheme] = useState('theme1')
  const dispatch = useDispatch();

  const handleSetTheme = (theme) => {
    setCurrentTheme(theme)
    if (theme === 'theme1') dispatch(setTheme1());
    if (theme === 'theme2') dispatch(setTheme2());
    if (theme === 'theme3') dispatch(setTheme3());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity
        style={[
          styles.button,
          currentTheme === 'theme1' && styles.selectedButton,
        ]}
        onPress={() => handleSetTheme('theme1')}
      >
        <Text
          style={[
            styles.buttonText,
            currentTheme === 'theme1' && styles.selectedButtonText,
          ]}
        >
          Set Theme 1
        </Text>
      </TouchableOpacity>

      <View style={styles.spacing} />

      <TouchableOpacity
        style={[
          styles.button,
          currentTheme === 'theme2' && styles.selectedButton,
        ]}
        onPress={() => handleSetTheme('theme2')}
      >
        <Text
          style={[
            styles.buttonText,
            currentTheme === 'theme2' && styles.selectedButtonText,
          ]}
        >
          Set Theme 2
        </Text>
      </TouchableOpacity>

      <View style={styles.spacing} />

      <TouchableOpacity
        style={[
          styles.button,
          currentTheme === 'theme3' && styles.selectedButton, 
        ]}
        onPress={() => handleSetTheme('theme3')}
      >
        <Text
          style={[
            styles.buttonText,
            currentTheme === 'theme3' && styles.selectedButtonText,
          ]}
        >
          Set Theme 3
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212', // Dark background for dark theme
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F0F0F0', // Light text for dark background
  },
  spacing: {
    marginVertical: 10,
  },
  button: {
    width: 200,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEB3B', // Default yellow button color (bright)
  },
  buttonText: {
    color: '#121212', // Dark text color on yellow button
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: '#FF9800', // Darker yellow for selected button
    borderWidth: 2,
    borderColor: '#F57C00', // Darker border for selected button
  },
  selectedButtonText: {
    color: '#FFFFFF', // White text for selected button
  },
});

export default Settings;
