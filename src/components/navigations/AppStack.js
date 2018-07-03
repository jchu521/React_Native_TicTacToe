import { createStackNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import AboutScreen from '../screens/AboutScreen';
import AIModeScreen from '../screens/games/GameAiMode';
import OnlineGameScreen from '../screens/games/GameOnline';
import SelectGameModeScreen from '../navigations/bottomTabNavigator';

import React from 'react';



const app = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions:{
      header: null,
      gesturesEnabled: false,
    }
  },

  SelectGameMode: {
    screen: SelectGameModeScreen,
    navigationOptions:{
     header: null,
    }
  },

  AIMode: {
    screen: AIModeScreen,
    navigationOptions: ({navigation}) =>(
      {
        title: 'AI Mode',
      }
    )
  },

  OnlineMode: {
    screen: OnlineGameScreen,
    navigationOptions: ({navigation}) =>(
      {
        title: 'Online Mode',
      }
    )
  },

  About: {
    screen: AboutScreen,
    navigationOptions: ({navigation}) =>(
      {
        title: 'About',
      }
    )
  }
},{
   // initialRouteName: 'About'
});

export default app;
