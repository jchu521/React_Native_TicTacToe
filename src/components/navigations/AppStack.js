import { createStackNavigator } from 'react-navigation';
import MainScreen from '../screens/MainScreen';
import SelectGameModeScreen from '../screens/games/SelectGameModeScreen';
import React from 'react';
import { Image } from 'react-native';
import styles from '../../styles/mainScreenStyle'
import Icon from 'react-native-vector-icons/Ionicons';

const SelectGameModeHeader =()=>(
    <Image
      style={styles.title}
      resizeMode={'center'}
      source={require('../../images/mainScreen/tictactoeTitle.png')}
    />
)

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
    navigationOptions: ({navigation}) =>(
      {
        header: null,
      }
    )
  }
});

export default app;
