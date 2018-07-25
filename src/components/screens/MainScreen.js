import React, { Component } from 'react';

import I18n from '../../languages/i18n';
import { Image, TouchableOpacity, View, ImageBackground, AsyncStorage } from 'react-native';
import { Text } from 'react-native-elements';
import codePush from 'react-native-code-push'
import { bindActionCreators } from "redux";
import * as actions from '../actions/index';
import { connect } from 'react-redux';

import views from '../../styles/views';
import buttons from '../../styles/button';
import { Colors } from '../../styles/colors'

class MainScreen extends Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground source={require('../../images/default.jpg')} blurRadius={3} style={views.container}>
        <View style={[views.container, {flex: 2}]}>
          <Text h1>Tic Tac Toe</Text>
        </View>

        <View style={[buttons.buttonGroup, {flex: 3}]}>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple}
              ]}
              onPress={() => navigate('AIMode')}
            >
              <Text h2 style={{color:'white'}}>{I18n.t('mainScreen.computer')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple}
              ]}
              onPress={() => navigate('OnlineMode')}
            >
              <Text h2 style={{color:'white'}}>{I18n.t('mainScreen.online')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple}
              ]}
              onPress={() => navigate('Info')}
            >
              <Text h2 style={{color:'white'}}>{I18n.t('mainScreen.info')}</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:1}} />

      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchProps)(MainScreen);
