import React, { Component } from 'react';

import I18n from '../../languages/i18n';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

import views from '../../styles/views';
import { Colors } from '../../styles/colors'
import buttons from '../../styles/button';

export default class OnlineScreen extends Component {

  render() {
    const { navigate } = this.props.navigation

    return(
      <ImageBackground source={require('../../images/default.jpg')} style={views.container}>
        <View style={[buttons.buttonGroup]}>
          <TouchableOpacity
            style={[
              buttons.DefaultBtn,
              {backgroundColor: Colors.blue}
            ]}
            onPress={() => navigate('AIMode', {level: 'EASY'})}
          >
            <Text h3 style={{color:'white'}}>{I18n.t('info.settings')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              buttons.DefaultBtn,
              {backgroundColor: Colors.lightGreen}
            ]}
            onPress={() => navigate('AIMode', {level: 'MEDIUM'})}
          >
            <Text h3 style={{color:'white'}}>{I18n.t('info.leaderboard')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              buttons.DefaultBtn,
              {backgroundColor: Colors.lightPurple}
            ]}
            onPress={() => navigate('AIMode', {level: 'MEDIUM'})}
          >
            <Text h3 style={{color:'white'}}>{I18n.t('info.contact')}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}
