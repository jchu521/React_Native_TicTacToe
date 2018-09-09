import React, { Component } from 'react';
import { View, AsyncStorage, DeviceEventEmitter } from 'react-native';
import { Text } from 'react-native-elements';
import PercentageCircle from 'react-native-percentage-circle';
import { bindActionCreators } from "redux";
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import I18n from '../../languages/i18n';
import fonts from '../../styles/fonts';

class DisplayWinRate extends Component {
    constructor() {
        super();
        this.state = {
          roundsNum : 0,
          win: 0,
          loss: 0,
          draw: 0,
          winRate: 0,
          isReady: false
        }
      }

    componentWillMount(){
        this._bootstrapAsync();
        this.listener = DeviceEventEmitter.addListener('refeshWinRate',()=>{
            this._bootstrapAsync();
        })
    }

    componentWillUnmount(){
        this.listener.remove();
    }

    _bootstrapAsync = () => {
        const { getUserMatchResult } = this.props;
        const uuid = DeviceInfo.getUniqueID();

        console.log(uuid)
        getUserMatchResult(uuid);
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.user && nextProps.user.result != this.props.user.result){
            const { win, loss, draw } = nextProps.user.result;

            if(win !==0 && loss !== 0 && draw !== 0){
                winRate = ((parseInt(win)+0.5*parseInt(draw))*100/(parseInt(win)+parseInt(loss)+parseInt(draw))).toFixed(1);
            }else{
              winRate =0;
            }

            this.setState({winRate: isNaN(winRate) ? 0 : winRate, win,loss,draw});
        }
    }

    render() {
        const { winRate, win, loss, draw } = this.state;
        console.log(this)
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <View style={{flexDirection:'row', flex:1, alignItems:'center', justifyContent:'space-around', width:'80%',marginBottom:'30%'}}>
                    <View style={{flex:1, justifyContent:'flex-start', width:'100%'}}>
                        <Text h4 style={[fonts.customFont2,{textAlign:'center'}]}>{I18n.t('user.win')}</Text>
                        <Text h3 style={[fonts.customFont3,{textAlign:'center', color: 'blue'}]}>{win}</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-start', width:'100%'}}>
                        <Text h4 style={[fonts.customFont2,{textAlign:'center'}]}>{I18n.t('user.draw')}</Text>
                        <Text h3 style={[fonts.customFont3,{textAlign:'center', color: 'blue'}]}>{draw}</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-start', width:'100%'}}>
                        <Text h4 style={[fonts.customFont2,{textAlign:'center'}]}>{I18n.t('user.loss')}</Text>
                        <Text h3 style={[fonts.customFont3,{textAlign:'center', color: 'blue'}]}>{loss}</Text>
                    </View>
                  </View>
                  <View style={{alignItems:'center', justifyContent:'center', flex:1, marginBottom:'20%',width:'100%', height:'100%'}}>
                      <PercentageCircle borderWidth={5}
                          children={
                          <View>
                              <Text style={[fonts.customFont2,{textAlign:'center'}]} h4>{I18n.t('user.winRate')}</Text>
                              <Text style={[fonts.customFont3,{textAlign:'center'}]} h3>{winRate }%</Text>
                          </View>
                          }
                          radius={80} percent={winRate} textStyle={{fontSize: 24}} color={"#3498db"} />
                  </View>
                </View>
            </View>
        )
    }

}

const mapStateToProps = (state) => ({
    ...state
})

const mapDispatchProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchProps)(DisplayWinRate)
