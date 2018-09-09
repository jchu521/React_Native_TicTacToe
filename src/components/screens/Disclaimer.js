import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

import { Colors } from '../../styles/colors'
import I18n from '../../languages/i18n';

import buttons from '../../styles/button';
import views from '../../styles/views';
import fonts from '../../styles/fonts';

class Disclaimer extends Component {
  render() {
    return(
      <ImageBackground
        source={require('../../images/default.jpg')}
        style={views.container}
        contentContainerStyle={{
          flex: 1,
          paddingTop: 24,
          backgroundColor: 'white',
        }}
      >
        <View style={{flex:1}} />
        <View style={[buttons.buttonGroup, {flex: 5}]}>
          <View style={[views.container, views.buttonGroupView,{flex:1}]}>
            <Text h2 style={[fonts.customFont2, {color:'#E8E2B3'}]}>{I18n.t('disclaimer.title')}</Text>
          </View>
          <View style={[views.container,{flex:3}]} >
            <Text style={{ textAlign: 'center', width:'90%', fontSize: 20}} >{I18n.t('disclaimer.disclaimer')}</Text>
          </View>
        </View>
        <View style={{flex:1}} />
      </ImageBackground>
    )
  }
}

export default Disclaimer;
