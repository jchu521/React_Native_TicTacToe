import { createStackNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import ContactScreen from '../screens/ContactScreen';
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

  Contact: {
    screen: ContactScreen,
    navigationOptions: ({navigation}) =>(
      {
        title: 'Contact Us',
      }
    )
  }
},{
   // initialRouteName: 'Contact'
});

export default app;
