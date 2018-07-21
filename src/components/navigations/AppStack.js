import { createStackNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import AboutScreen from '../screens/AboutScreen';
import AIModeScreen from '../screens/games/GameAiMode';
import OnlineGameScreen from '../screens/games/GameOnline';
import SelectGameModeScreen from '../navigations/bottomTabNavigator';
import VersionScreen from '../screens/VersionScreen';
import React from 'react';



export default createStackNavigator({

  Main: {
    screen: MainScreen,
    navigationOptions:{
      header: null,
    }
  },

  SelectGameMode: {
    screen: SelectGameModeScreen,
    navigationOptions: {
     header: null,
    }
  },

  AIMode: {
    screen: AIModeScreen,
    navigationOptions: {
     header: null,
    }

  },

  OnlineMode: {
    screen: OnlineGameScreen,
    navigationOptions: {
     header: null,
    }
  },

  About: {
    screen: AboutScreen,
    navigationOptions: {
     header: null,
    }
  },

  Version: {
    screen: VersionScreen,
    navigationOptions: {
     header: null,
    }
  },

},{
    // initialRouteName: 'Version'
});
