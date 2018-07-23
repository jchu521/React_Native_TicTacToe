import React, { Component } from 'react';
import { ProgressBarAndroid,Alert, AsyncStorage, Switch, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { Text } from 'react-native-elements';

import { Colors } from '../../styles/colors';
import I18n from '../../languages/i18n';
import codePush from 'react-native-code-push';
import { bindActionCreators } from "redux";
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modalbox';

import buttons from '../../styles/button';
import views from '../../styles/views';

class VersionScreen extends Component {
  state={
    value: null,
    version: null,
    label: null,
    receivedBytes: null,
    totalBytes: null,
    isDisabled: false,
  }
  componentDidMount(){
    // this._retrieveData()
    // this._setAppVersion()
  }


  // _setAppVersion = () => {
  //   if(this.props.appInfo.appInfo!==null){
  //     this.setState({
  //       version: this.props.appInfo.appInfo.appVersion,
  //       label: this.props.appInfo.appInfo.label
  //     })
  //   }
  // }

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
      this.setState({value: false});
      await AsyncStorage.setItem('AutoUpdate', 'false');
    }else{
      this.setState({value: true});
      await AsyncStorage.removeItem('AutoUpdate');
    }
  }

  _updateNow(){
    codePush.sync({ updateDialog: true },
      (status) => {
          switch (status) {
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                // Show "downloading" modal
                this.refs.result.open();
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                this.refs.result.close();
                codePush.restartApp();
                break;
          }
      },
      ({ receivedBytes, totalBytes, }) => {
        /* Update download modal progress */
        this.setState({receivedBytes,totalBytes});

      }
    );
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
    const { version, label, receivedBytes, totalBytes } = this.state;

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
          </View>
        </View>
        <View style={{flex:1}} />
        <Modal
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
            width: '100%',
            zIndex: 2,
            backgroundColor: Colors.lightPurple
          }}
          position={"center"}
          ref={"result"}
          backdropPressToClose={false}
          swipeToClose={false}
          >
          {receivedBytes!==null && totalBytes !== null &&
            <View>
              <Text>Installing...</Text>
              <Text>Do not turn off power</Text>
              <Progress.Bar progress={receivedBytes/totalBytes} width={200} />
            </View>
          }
        </Modal>
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
