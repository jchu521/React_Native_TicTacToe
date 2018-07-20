import React, { Component } from 'react';
import { ProgressBarAndroid,Alert, AsyncStorage, Switch, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { Text } from 'react-native-elements';

import PropTypes from 'prop-types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Fumi, Sae } from 'react-native-textinput-effects';
import { Colors } from '../../styles/colors';
import I18n from '../../languages/i18n';
import codePush from 'react-native-code-push';
import { bindActionCreators } from "redux";
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';

import buttons from '../../styles/button';
import views from '../../styles/views';

class VersionScreen extends Component {
  state={
    logs:[],
    value: null,
    version: null,
    label: null,
  }
  componentDidMount(){
    this._retrieveData();
    this._setAppVersion();
  }

  _setAppVersion = () => {
    this.setState({
      version: this.props.appInfo.appInfo.appVersion,
      label: this.props.appInfo.appInfo.label
    })
  }

  _retrieveData = async () => {
      const value = await AsyncStorage.getItem('AutoUpdate');

      if (value !== null) {
        this.setState({value: false});
      }else{
        this.setState({value: true});
      }
  }

  _setAutoSave = async()=>{
    const {value} = this.state;

    if(value){
      await AsyncStorage.setItem('AutoUpdate', 'false');
    }else{
      await AsyncStorage.removeItem('AutoUpdate');
    }
    this.setState({value: !this.state.value});
  }

  codepushSync(){
    this.setState({logs: ["Started at " + new Date().getTime()]});
    codePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE
    }, (status) => {
      for( var key in codePush.SyncStatus){
        if(status === codePush.SyncStatus[key]){
          this.setState(prevState => ({logs: [...prevState.logs, key.replace(/_/g,' ')]}));
          break;
        }
      }
    });
  }

  _updateNow(){
    codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
  }

  checkUpdate = () => {
    codePush.checkForUpdate().then((update) => {
        if (!update) {
          Alert.alert(
            'Message',
            'The app is up to date!',
            [
              {text: 'OK'},
            ],
            { cancelable: false }
          )
        } else {
          Alert.alert(
            'Message',
            'An update is available!',
            [
              {text: 'Update Now', onPress: () => this._updateNow()},
              {text: 'Update Later'},
            ],
            { cancelable: false }
          )
        }
    });
  }


  render() {
    console.log(this);
    const { appInfo } = this.props.appInfo;
    const { version, label } = this.state;

    return (
      <ImageBackground
        source={require('../../images/default.jpg')}
        style={views.container}
      >
        <View style={{flex:1}} />
        <View style={[buttons.buttonGroup,{flex:5}]}>
          <View style={[views.container, views.buttonGroupView, {marginBottom: 0}]}>
            <Text h2 style={{color:'#E8E2B3'}}>{I18n.t('version.version')}</Text>
          </View>
          <View style={[views.container,{flex:4, width:'100%'}]}>
            { version!==null && <Text h4>Current Version: {version}.{label}</Text>}
            <View style={{flexDirection:'row'}}>
              <Text h4 >Auto Update: </Text>
              <Switch value={this.state.value}  thumbTintColor={'white'} onValueChange={() => this._setAutoSave()}/>
            </View>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple}
              ]}
              onPress={() => this.checkUpdate()}
            >
              <Text h3 style={{color:'white'}}>Check Update</Text>
            </TouchableOpacity>
            {this.state.logs.map((log, i) => <Text key={i}>{log}</Text>)}
          </View>
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
export default connect(mapStateToProps, mapDispatchProps)(VersionScreen);
