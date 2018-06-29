import React, { Component } from 'react';
import { Image, TouchableOpacity, View, ImageBackground, PixelRatio } from 'react-native';
import styles from '../../../styles/mainScreenStyle';
import C from '../../../constants';

export default class SelectGameMode extends Component {

  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <ImageBackground source={require('../../../images/default.jpg')} style={styles.container}>
        <View style={{flex:1, justifyContent:'center'}}>
          <TouchableOpacity style={{marginBottom:10, marginTop:10}} onPress={() => navigate('SelectGameMode')}>
            <Image
              source={require('../../../images/selectGameModesScreen/AIButton.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginBottom:10, marginTop:10}} onPress={() => navigate('SelectGameMode')}>
            <Image
              source={require('../../../images/selectGameModesScreen/onlineButton.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginBottom:10, marginTop:10}} onPress={() => navigate('SelectGameMode')}>
            <Image
              source={require('../../../images/selectGameModesScreen/friendsButton.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginBottom:10, marginTop:10}} onPress={() => goBack()}>
            <Image
              source={require('../../../images/selectGameModesScreen/backButton.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
