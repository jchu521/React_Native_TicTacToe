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
import fonts from '../../styles/fonts';
import { Colors } from '../../styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


class MainScreen extends Component {

  componentDidMount(){
    this._bootstrapAsync();

  }

  _bootstrapAsync = async() => {
    var AvatarImg = await AsyncStorage.getItem('AvatarImg');

    if(AvatarImg != null || AvatarImg != undefined){
      this.props.userPhoto(AvatarImg);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    console.log(this);
    return (
      <ImageBackground source={require('../../images/default.jpg')} blurRadius={3} style={views.container}>
        <View style={[views.container, {flex: 2}]}>
          <Text h1 style={fonts.customFont2} >Tic Tac Toe</Text>
        </View>

        <View style={[buttons.buttonGroup, {flex: 3}]}>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple, height: 50}
              ]}
              onPress={() => navigate('AIMode')}
            >
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <FontAwesome  name={'user'} color='white' size={25} style={{marginRight:10}}/>
                <Text h2 style={[fonts.customFont3,{color:'white'}]}>{I18n.t('mainScreen.computer')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple, height: 50}
              ]}
              onPress={() => navigate('OnlineMode')}
            >
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <MaterialCommunityIcons  name={'account-multiple'} color='white' size={25} style={{marginRight:10}}/>
                <Text h2 style={[fonts.customFont3,{color:'white'}]}>{I18n.t('mainScreen.online')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple, height: 50}
              ]}
              onPress={() => navigate('Info')}
            >
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <FontAwesome  name={'info'} color='white' size={25} style={{marginRight:10}}/>
                <Text h2 style={[fonts.customFont3,{color:'white'}]}>{I18n.t('mainScreen.info')}</Text>
              </View>
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
