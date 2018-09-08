import React, { Component } from 'react';

import I18n from '../../languages/i18n';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

import views from '../../styles/views';
import fonts from '../../styles/fonts';
import { Colors } from '../../styles/colors'
import buttons from '../../styles/button';
import playSoundBundle  from '../utils/sound';

import codePush from 'react-native-code-push';

export default class OnlineScreen extends Component {
  state = {
    appdata: null,
  };
  componentDidMount(){
    codePush.getCurrentPackage().then((data) =>{
      this.setState({
        appdata:data,
      });
    });
  }

  onClickButton = (screen) => {
    const { navigate } = this.props.navigation;

    navigate(screen);
    playSoundBundle('clickOn.wav');
  }

  render() {
    const { navigate } = this.props.navigation

    return(
      <ImageBackground source={require('../../images/default.jpg')} blurRadius={3} style={views.container}>
        <View style={views.container}>
          <Text h1 style={fonts.customFont2}>Tic Tac Toe</Text>

        </View>
        <View style={[buttons.buttonGroup]}>
          <View style={[views.container, views.buttonGroupView, {marginBottom: 0}]}>
            <Text h2 style={[fonts.customFont2, {color:'#E8E2B3'}]}>{I18n.t('info.info')}</Text>
          </View>
          <View style={[views.container,{flex:4}]}>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple}
              ]}
              onPress={() => this.onClickButton('About')}
            >
              <Text h3 style={[fonts.customFont3, {color:'white'}]}>{I18n.t('info.about')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple}
              ]}
              onPress={() => this.onClickButton('Disclaimer')}
            >
              <Text h3 style={[fonts.customFont3, {color:'white'}]}>{I18n.t('info.disclaimer')}</Text>
            </TouchableOpacity>
          </View>
          {this.state.appdata?this._renderVersion():null}

        </View>
      </ImageBackground>
    )
  }
  _renderVersion = () =>{
    // console.log(this.state.appdata);
    return (
      <View style={[views.container,{flex:1}]}>
        <Text h3 style={{ textAlign: 'center', width:'90%', fontSize: 22}}>{'Version:'+this.state.appdata.appVersion}</Text>
        <Text h3 style={{ textAlign: 'center', width:'90%', fontSize: 22}}>{'Build:'+this.state.appdata.label}</Text>
      </View>
    )
  }
}
