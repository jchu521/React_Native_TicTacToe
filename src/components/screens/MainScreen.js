import React, { Component } from 'react';
import { Image, TouchableOpacity, View, ImageBackground } from 'react-native';
import styles from '../../styles/mainScreenStyle';
import C from '../../constants';

export default class MainScreen extends Component {

  render() {
    const { navigate } = this.props.navigation
    return (
      <ImageBackground source={require('../../images/mainScreen/mainScreen.png')} style={styles.container}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={{marginBottom:10, marginTop:10}} onPress={() => navigate('SelectGameMode')}>
            <Image
              source={require('../../images/mainScreen/playButton.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginBottom:10, marginTop:10}}>
            <Image
              source={require('../../images/mainScreen/settingsButton.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginBottom:20, marginTop:10}}>
            <Image
              source={require('../../images/mainScreen/leaderboardButton.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
