import { createStackNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import AboutScreen from '../screens/AboutScreen';
import DisclaimerScreen from '../screens/Disclaimer';
import AIModeScreen from '../screens/games/GameAiMode';
import OnlineGameScreen from '../screens/games/GameOnlineNode';
import {bottomTab1, bottomTab2, bottomTab3} from '../navigations/bottomTabNavigator';
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

  AIMode: {
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

  Info: {
    screen: bottomTab3,
    navigationOptions: {
     header: null,
    }
  },

  About: {
    screen: AboutScreen,
    navigationOptions: {
     title: 'About',
    //  headerStyle: {
    //   backgroundColor: '#071F1A'
    // },
    // headerTintColor: navigationOptions.headerStyle.backgroundColor,
    }
  },

  Disclaimer:{
    screen: DisclaimerScreen,
    navigationOptions: {
      title: 'Disclaimer'
    }
  },

},{
    // initialRouteName: 'About'
});
