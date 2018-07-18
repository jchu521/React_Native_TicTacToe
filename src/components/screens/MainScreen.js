import React, { Component } from 'react';

import I18n from '../../languages/i18n';
import { Image, TouchableOpacity, View, ImageBackground, Button } from 'react-native';
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
    const { appInfo } = this.props.appInfo;

    console.log(this);
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
          <Text h5 >Version: {appInfo.appVersion}.{appInfo.label}</Text>
        </View>
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
