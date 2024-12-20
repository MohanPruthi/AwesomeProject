import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import List from './src/components/List/List';
import FeedbackForm from './src/components/FeedbackForm/FeedbackForm';
import Settings from './src/components/Settings/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  const getRouteIcons = ({focused, color, size, route}) => {
    let iconName;
    if (route.name === 'List') {
      iconName = focused ? 'list' : 'list-outline';
    } else if (route.name === 'FeedbackForm') {
      iconName = focused ? 'create' : 'create-outline';
    } else if (route.name === 'Settings') {
      iconName = focused ? 'settings' : 'settings-outline';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            getRouteIcons({focused, color, size, route});
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="FeedbackForm" component={FeedbackForm} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
