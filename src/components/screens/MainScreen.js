import React, { Component } from 'react';

import I18n from '../../languages/i18n';
import { Image, TouchableOpacity, View, ImageBackground, Button } from 'react-native';
import { Text } from 'react-native-elements';

import views from '../../styles/views';
import buttons from '../../styles/button';
import { Colors } from '../../styles/colors'
//Kevin, For OTA, Codepush
// import codePush from 'react-native-code-push'

export default class MainScreen extends Component {

  componentDidMount(){
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <ImageBackground source={require('../../images/mainScreen.png')} style={views.container}>
        <View style={{flex:1}}/>
        <View style={views.container}>
          <TouchableOpacity
            style={[
              buttons.DefaultBtn,
              {backgroundColor: Colors.yellow}
            ]}
            onPress={() => navigate('SelectGameMode')}
          >
            <Text h1 style={{color:'white'}}>{I18n.t('mainScreen.start')}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
