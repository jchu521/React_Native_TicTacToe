import React, { Component } from 'react';
import { Button, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, View, TextInput } from 'react-native';
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

import buttons from '../../styles/button';
import views from '../../styles/views';

class VersionScreen extends Component {
  state={
    logs:[],
  }

  componentDidMount(){
    codePush.notifyAppReady();
    this.props.getUpdateMetadata();
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

  checkUpdate = () => {
    codePush.checkForUpdate().then((update) => {
        if (!update) {
          alert("The app is up to date!");
        } else {
          alert("An update is available!");
        }
    });
  }

  render() {
    console.log(this);
    const { appInfo } = this.props.appInfo;

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
          <View style={[views.container,{flex:4}]}>
            <Text h4 >Current Version: {appInfo.appVersion}.{appInfo.label}</Text>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple}
              ]}
              onPress={() => this.checkUpdate()}
            >
              <Text h3 style={{color:'white'}}>Check Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple}
              ]}
              onPress={() => appInfo.install(codePush.InstallMode = codePush.InstallMode.IMMEDIATE)}
            >
              <Text h3 style={{color:'white'}}>Update</Text>
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
