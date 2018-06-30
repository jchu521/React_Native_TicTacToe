import React, { Component } from 'react';

import I18n from '../../../languages/i18n';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

import views from '../../../styles/views';
import { Colors } from '../../../styles/colors'
import buttons from '../../../styles/button';

export default class OnlineScreen extends Component {


  render() {
    const { navigate } = this.props.navigation

    return(
      <ImageBackground source={require('../../../images/default.jpg')} style={views.container}>
        <View style={{flex:1}}/>
        <View style={[buttons.buttonGroup, { flex: 3, marginTop:0}]}>
          <TouchableOpacity
            style={[
              buttons.DefaultBtn,
              {backgroundColor: Colors.lightBlue}
            ]}
            onPress={() => navigate('AIMode', {level: 'EASY'})}
          >
            <Text h3 style={{color:'white'}}>{I18n.t('online.online')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              buttons.DefaultBtn,
              {backgroundColor: Colors.lightOrange}
            ]}
            onPress={() => navigate('AIMode', {level: 'MEDIUM'})}
          >
            <Text h3 style={{color:'white'}}>{I18n.t('online.friends')}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}
