import { createBottomTabNavigator, TabNavigator } from 'react-navigation';
import SelectAILevelsScreen from '../screens/games/SelectAILevelsScreen';
import OnlineScreen from '../screens/games/OnlineScreen';
import InfoScreen from '../screens/InfoScreen';

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default createBottomTabNavigator(
  {
    SelectAILevels: {
      screen: SelectAILevelsScreen,
      navigationOptions: {
        title: 'AI',
        tabBarIcon: ({ focused, tintColor }) => {
            return <MaterialIcons  name={'computer'} color={tintColor} size={25}/>
        },
      },

    },

    OnlineScreen: {
      screen: OnlineScreen,
      navigationOptions: {
        title: 'Online',
        tabBarIcon: ({ focused, tintColor }) => {
            let iconName = `ios-globe${focused ? '' : '-outline'}`;
            return <Ionicons  name={iconName} color={tintColor} size={25}/>
        },
      },
    },

    InfoScreen: {
      screen: InfoScreen,
      navigationOptions: {
        title: 'Info',
        tabBarIcon: ({ focused, tintColor }) => {
            let iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            return <Ionicons  name={iconName} color={tintColor} size={25}/>
        },
      },
    }
  },
  {
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'white',
        style: { backgroundColor: '#071F1A'},
        labelStyle: {fontSize:12},
    },
  }
);
