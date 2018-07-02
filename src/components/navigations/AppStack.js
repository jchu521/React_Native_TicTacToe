import { createStackNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import AIModeScreen from '../screens/games/GameAiMode';
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

},{
});

export default app;
