import { createStackNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import AboutScreen from '../screens/AboutScreen';
import DisclaimerScreen from '../screens/Disclaimer';
import AIModeScreen from '../screens/games/GameAiMode';
import OnlineGameScreen from '../screens/games/GameOnlineNode';
import {bottomTab1, bottomTab2} from '../navigations/bottomTabNavigator';
import React from 'react';



export default createStackNavigator({

  Main: {
    screen: MainScreen,
    navigationOptions: ({navigation}) =>(
      {
        header: null,
      }
    )
  },

  SelectGameMode: {
    screen: bottomTab1,
    navigationOptions: {
     header: null,
    }
  },

  OnlineMode: {
    screen: bottomTab2,
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

  About: {
    screen: AboutScreen,
    navigationOptions: {
     header: null,
    }
  },

  Disclaimer:{
    screen: DisclaimerScreen,
    navigationOptions: {
     header: null,
    }
  },

},{
    // initialRouteName: 'About'
});
