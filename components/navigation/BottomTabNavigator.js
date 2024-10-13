// components/navigation/BottomTabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import AddStackNavigator from './AddStackNavigator'; // Import the AddStackNavigator
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // Hide headers on individual screens
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/home.png')}
              style={[
                styles.icon,
                focused ? styles.iconFocused : styles.iconUnfocused,
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddStackNavigator} // Use the AddStackNavigator here
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/Add.png')}
              style={[
                styles.icon,
                focused ? styles.iconFocused : styles.iconUnfocused,
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/History.png')}
              style={[
                styles.icon,
                focused ? styles.iconFocused : styles.iconUnfocused,
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconFocused: {
    tintColor: '#2196F3',
  },
  iconUnfocused: {
    tintColor: '#aaa',
  },
});

export default BottomTabNavigator;
