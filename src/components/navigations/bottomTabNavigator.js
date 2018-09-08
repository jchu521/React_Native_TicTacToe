import { createBottomTabNavigator, TabNavigator } from 'react-navigation';
import GameOnlineScreen from '../screens/games/GameOnlineNode';
import GameAiModeScreen from '../screens/games/GameAiMode';
import InfoScreen from '../screens/InfoScreen';
import UserScreen from '../screens/UserScreen';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export const bottomTab1= createBottomTabNavigator({
    Account: {
      screen: UserScreen,
      navigationOptions: {
        swipeEnabled: true,
        title: 'Account',
        tabBarIcon: ({ focused, tintColor }) => {
            return <FontAwesome  name={'user'} color={tintColor} size={25}/>
        },
      },
    },
    GameAiMode: {
      screen: GameAiModeScreen,
      navigationOptions: {
        swipeEnabled: true,
        title: 'AI',
        tabBarIcon: ({ focused, tintColor }) => {
            return <MaterialIcons  name={'computer'} color={tintColor} size={25}/>
        },
      },

    },

    OnlineMode: {
      screen: GameOnlineScreen,
      navigationOptions: {
        swipeEnabled: true,
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
        swipeEnabled: true,
        title: 'Info',
        tabBarIcon: ({ focused, tintColor }) => {
            let iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            return <Ionicons  name={iconName} color={tintColor} size={25}/>
        },
      },
    }
  },
  {
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'white',
        style: { backgroundColor: '#071F1A'},
        labelStyle: {fontSize:12},
    },
    initialRouteName: 'GameAiMode'
  }
);

export const bottomTab2= createBottomTabNavigator({
  Account: {
    screen: UserScreen,
    navigationOptions: {
      swipeEnabled: true,
      title: 'Account',
      tabBarIcon: ({ focused, tintColor }) => {
          return <FontAwesome  name={'user'} color={tintColor} size={25}/>
      },
    },
  },
    GameAiMode: {
      screen: GameAiModeScreen,
      navigationOptions: {
        swipeEnabled: true,
        title: 'AI',
        tabBarIcon: ({ focused, tintColor }) => {
            return <MaterialIcons  name={'computer'} color={tintColor} size={25}/>
        },
      },

    },

    OnlineMode: {
      screen: GameOnlineScreen,
      navigationOptions: {
        swipeEnabled: true,
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
        swipeEnabled: true,
        title: 'Info',
        tabBarIcon: ({ focused, tintColor }) => {
            let iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            return <Ionicons  name={iconName} color={tintColor} size={25}/>
        },
      },
    }
  },
  {
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'white',
        style: { backgroundColor: '#071F1A'},
        labelStyle: {fontSize:12},
    },
    initialRouteName: 'OnlineMode'
  }
);

export const bottomTab3= createBottomTabNavigator({
  Account: {
    screen: UserScreen,
    navigationOptions: {
      swipeEnabled: true,
      title: 'Account',
      tabBarIcon: ({ focused, tintColor }) => {
          return <FontAwesome  name={'user'} color={tintColor} size={25}/>
      },
    },
  },
    GameAiMode: {
      screen: GameAiModeScreen,
      navigationOptions: {
        swipeEnabled: true,
        title: 'AI',
        tabBarIcon: ({ focused, tintColor }) => {
            return <MaterialIcons  name={'computer'} color={tintColor} size={25}/>
        },
      },

    },

    OnlineMode: {
      screen: GameOnlineScreen,
      navigationOptions: {
        swipeEnabled: true,
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
        swipeEnabled: true,
        title: 'Info',
        tabBarIcon: ({ focused, tintColor }) => {
            let iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            return <Ionicons  name={iconName} color={tintColor} size={25}/>
        },
      },
    }
  },
  {
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'white',
        style: { backgroundColor: '#071F1A'},
        labelStyle: {fontSize:12},
    },
    initialRouteName: 'InfoScreen'
  }
);

export const bottomTab4= createBottomTabNavigator({
  Account: {
    screen: UserScreen,
    navigationOptions: {
      swipeEnabled: true,
      title: 'Account',
      tabBarIcon: ({ focused, tintColor }) => {
          return <FontAwesome  name={'user'} color={tintColor} size={25}/>
      },
    },
  },
    GameAiMode: {
      screen: GameAiModeScreen,
      navigationOptions: {
        swipeEnabled: true,
        title: 'AI',
        tabBarIcon: ({ focused, tintColor }) => {
            return <MaterialIcons  name={'computer'} color={tintColor} size={25}/>
        },
      },

    },

    OnlineMode: {
      screen: GameOnlineScreen,
      navigationOptions: {
        swipeEnabled: true,
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
        swipeEnabled: true,
        title: 'Info',
        tabBarIcon: ({ focused, tintColor }) => {
            let iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            return <Ionicons  name={iconName} color={tintColor} size={25}/>
        },
      },
    }
  },
  {
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'white',
        style: { backgroundColor: '#071F1A'},
        labelStyle: {fontSize:12},
    },
    initialRouteName: 'Account'
  }
);
