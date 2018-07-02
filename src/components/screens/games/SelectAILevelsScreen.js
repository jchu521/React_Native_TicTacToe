import React, { Component } from 'react';

import I18n from '../../../languages/i18n';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

import views from '../../../styles/views';
import { Colors } from '../../../styles/colors'
import buttons from '../../../styles/button';

export default class SelectAILevelsScreen extends Component {

  render() {
    const { navigate } = this.props.navigation

    return(
      <ImageBackground source={require('../../../images/default.jpg')} style={views.container}>
        <View style={views.container}>
          <Text h1>Tic Tac Toe</Text>
        </View>
        <View style={[buttons.buttonGroup]}>
          <View style={[views.container, views.buttonGroupView]}>
            <Text h2 style={{color:'#E8E2B3'}}>{I18n.t('AILevels.selectLevel')}</Text>
          </View>
          <View style={[views.container, {flex: 4}]}>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.yellow}
              ]}
              onPress={() => navigate('AIMode', {level: 'EASY'})}
            >
              <Text h3 style={{color:'white'}}>{I18n.t('AILevels.easy')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.darkBlue}
              ]}
              onPress={() => navigate('AIMode', {level: 'MEDIUM'})}
            >
              <Text h3 style={{color:'white'}}>{I18n.t('AILevels.medium')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightRed}
              ]}
              onPress={() => navigate('AIMode', {level: 'HARD'})}
            >
              <Text h3 style={{color:'white'}}>{I18n.t('AILevels.hard')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

// <ImageBackground
//   source={require('../../../images/selectLevel.png')}
//   style={[buttons.buttonGroup,
//     {
//       marginVertical:'10%',
//       width:'90%'
//     }
//   ]}
// >
// </ImageBackground>
