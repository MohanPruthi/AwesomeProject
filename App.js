import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import List from './src/components/List/List';
import FeedbackForm from './src/components/FeedbackForm/FeedbackForm';
import Settings from './src/components/Settings/Settings';
// import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      // screenOptions={({route}) => ({
      //   tabBarIcon: ({focused, color, size}) => {
      //     let iconName;
      //     if (route.name === 'List') {
      //       iconName = focused ? 'list' : 'list-outline';
      //     } else if (route.name === 'New Feedback') {
      //       iconName = focused ? 'create' : 'create-outline';
      //     } else if (route.name === 'Settings') {
      //       iconName = focused ? 'settings' : 'settings-outline';
      //     }
      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      //   tabBarActiveTintColor: 'green',
      //   tabBarInactiveTintColor: 'gray',
      // })}
      >
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="FeedbackForm" component={FeedbackForm} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
