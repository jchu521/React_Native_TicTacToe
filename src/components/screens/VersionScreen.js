import React, { Component } from 'react';
import { Button, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { Text } from 'react-native-elements';

import PropTypes from 'prop-types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Fumi, Sae } from 'react-native-textinput-effects';
import { Colors } from '../../styles/colors'
import I18n from '../../languages/i18n';
import codePush from 'react-native-code-push'

import buttons from '../../styles/button';
import views from '../../styles/views';

export default class VersionScreen extends Component {
  state={
    version: null,
    isReady: false,
    logs:[]
  }

  componentDidMount(){
    codePush.getCurrentPackage().then((update) => {
      this.setState({version: update.appVersion, label: update.label });
    });
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
  getVersion(){
    codePush.getCurrentPackage()
    .then((update) => {
      this.setState({version: update.appVersion, label: update.label });
    });
  }
  render() {
    console.log(this);
    return (
      <ImageBackground
        source={require('../../images/default.jpg')}
        style={views.container}
        contentContainerStyle={styles.content}
      >
        <View style={{flex:1}} />
        <View style={[buttons.buttonGroup,{flex:5}]}>
          <View style={[views.container, views.buttonGroupView, {marginBottom: 0}]}>
            <Text h2 style={{color:'#E8E2B3'}}>{I18n.t('version.version')}</Text>
          </View>
          <View style={[views.container,{flex:4}]}>
            <Text h4 >Current Version: {this.state.version}.{this.state.label}</Text>

            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple}
              ]}
              onPress={() => this.codepushSync()}
            >
              <Text h3 style={{color:'white'}}>Check Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                buttons.DefaultBtn,
                {backgroundColor: Colors.lightPurple}
              ]}
              onPress={() => this.getVersion()}
            >
              <Text h3 style={{color:'white'}}>Version</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:1}} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  searchSection: {
    flexDirection: 'row',
    width:'80%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#404d5b',
},
searchIcon: {
    padding: 10,
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    // color: 'white',
},
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },

  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});
