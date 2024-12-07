/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from './src/components/List/List';
import FeedbackFrom from './src/components/FeedbackForm/FeedbackForm';
import Settings from './src/components/Settings/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon set



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ focused, color, size }) => {
      //     let iconName;

      //     if (route.name === 'List') {
      //       iconName = focused ? 'list' : 'list-outline';
      //     } else if (route.name === 'New Feedback') {
      //       iconName = focused ? 'create' : 'create-outline';
      //     } else if (route.name === 'Settings') {
      //       iconName = focused ? 'settings' : 'settings-outline';
      //     }

      //     // Return the icon component
      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      //   tabBarActiveTintColor: 'green',
      //   tabBarInactiveTintColor: 'gray',
      // })}
      >
        <Tab.Screen name="List" component={List}/>
        <Tab.Screen name="New Feedback" component={FeedbackFrom}/>
        <Tab.Screen name="Settings" component={Settings}/>
      </Tab.Navigator>
    </NavigationContainer>
  ); 
}
