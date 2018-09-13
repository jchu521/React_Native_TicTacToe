import React, { Component } from 'react';
import { View, ImageBackground, DeviceEventEmitter,StyleSheet} from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { bindActionCreators } from "redux";
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native'
import  ImagePicker from 'react-native-image-picker';
import DisplayWinRate from '../utils/displayWinRate';
import PercentageCircle from 'react-native-percentage-circle';
import views from '../../styles/views';
import fonts from '../../styles/fonts';

var userId;

class UserScreen extends Component {
    constructor() {
      super();
      this.state = {
        isReady: true,
        avatarSource: null,
        userId: null,
        win: 0,
        loss: 0,
        draw: 0,
        winRate: 0
      }
    }

    cameraAction = () =>{
      const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };

      ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
          console.log('User cancelled image picker');
      }
      else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
      }
      else {
          let source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.saveAvatar(source);
      }
    });

  }

    saveAvatar = async(source) =>{
      console.log('source' + source);
      await AsyncStorage.setItem('AvatarImg', source.uri);
      this.setState({
        avatarSource: source
      });
      console.log('Save Img' + source.uri);
    }

    componentDidMount(){
      this._bootstrapAsync();
    }

    _bootstrapAsync = async() =>{
      // const { photo } = this.props.user;
      console.log('Test');
      var AvatarImg = await AsyncStorage.getItem('AvatarImg');
      console.log('GET Img' + AvatarImg);

      if(AvatarImg != null || AvatarImg != undefined){
        this.setState({
          avatarSource: {uri: AvatarImg},
          isReady:true
        })
      }
    };
    render(){
        const { avatarSource,isReady } = this.state

        return(
          <ImageBackground source={require('../../images/default.jpg')} blurRadius={3} style={views.container}>
            {isReady &&
              <View style={{ flex: 1}}>
                <View style={{alignItems:'center',justifyContent:'center', flex:1}}>
                  <Avatar
                    xlarge
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    source={ avatarSource }
                    onPress={() => this.cameraAction()}
                    activeOpacity={0.7}
                  />
                </View>
                <View style={{ alignItems:'center',justifyContent:'center', flex:1, marginBottom:'10%'}}>
                  <DisplayWinRate />
                </View>
              </View>
            }
          </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchProps)(UserScreen)
