import React from 'react';
import { ImageBackground, StyleSheet, View, Switch, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import InputButton from '../../utils/InputButton'
import GameStyle from '../../../styles/GameStyle'
import Modal from 'react-native-modalbox';
import { Colors } from '../../../styles/colors';

import button from '../../../styles/button';
import text from '../../../styles/text';
import fonts from '../../../styles/fonts';
import I18n from '../../../languages/i18n';
import {CheckWinner, _displayMessage} from '../../utils/checkWinner';
import DeviceInfo from 'react-native-device-info';

import { bindActionCreators } from "redux";
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import { AsyncStorage, DeviceEventEmitter, AppState } from 'react-native';

const inputButtons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

const HeartBeatTime = 3000;

class GameOnlineNode extends React.Component {
  state = {
      uuid: null,
      squares: Array(9).fill(null),
      numSteps: 0,
      isYourTurn: null,
      role: null,
      roundStatus: null,
      modelStatus: null,
      modelMsg: null,
      modelButtonTip: null,
      online: 0,
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    this._stopHeartBeat();
    this.viewWillBlur.remove();
    this.viewDidFocus.remove();
    // AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidMount(){
    console.log('componentDidMount')
      //get from api yourTurn, role= 'O' or 'X'
      this.setState({
        uuid: DeviceInfo.getUniqueID(),
        isYourTurn: false,
      })
      if(this._interval){
        this._stopHeartBeat();
      }
      setTimeout(this._startHeartBeat, 1000);

      this.viewWillBlur = this.props.navigation.addListener('didBlur',this._willBlur);
      this.viewDidFocus = this.props.navigation.addListener('didFocus',this._didFocus);
      // AppState.addEventListener('change', this._handleAppStateChange);
      this.miss = 0;
  }

  _handleAppStateChange = (appState) => {
      console.log('handleAppStateChange:'+appState);
   }

  _willBlur = (obj) =>{
    if(this._interval){
      this._bk_interval = this._interval;
      this._stopHeartBeat();
    }
  };
  _didFocus = (obj) =>{
    if(this._bk_interval){
      this._startHeartBeat();
      this._bk_interval = null;
    }
  };

  _startHeartBeat = () => {
    console.log('_startHeartBeat:'+this._interval);
    this._stopHeartBeat();
    this._heartBeatInterval();
    this._interval = setInterval(this._heartBeatInterval, HeartBeatTime);
  };

  _stopHeartBeat = () => {
    console.log('_stopHeartBeat:'+this._interval);
    clearInterval(this._interval);
    this._interval = null;
  };

  _heartBeatInterval = () => {
      const { getStepsNode } = this.props;
      getStepsNode({
        uuid: this.state.uuid
      });
    };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(this.state);
    this._stepsHandler(nextProps);
  }

  _stepsHandler = (nextProps) =>{
      if(!this._interval){
        return;
      }
      if(nextProps.steps.steps){
        const {steps, role, start, oppoDisc, online} = nextProps.steps;
        if(oppoDisc){
          this._onOpponentDisconnect();
          return;
        }

        if(this.state.numSteps > 0 && online < this.state.online){
          this._onServerReset();
          return;
        }

        if(this.state.numSteps > 0 && online - 2 * 60 > this.state.online){
          this._onOffline();
          return;
        }

        if(start)
        {
          let isYourTurn = false;
          let numSteps = this.state.numSteps;
          let squares = this.state.squares;
          if(numSteps > steps.length && !this.state.isYourTurn){
            this.miss++;
            if(this.miss > 1){
              numSteps = steps.length;
              this._playPiece(null);
              return;
            }
          }
          else {
            this.miss = 0;
          }
          if(steps.length > this.state.numSteps){
            numSteps = steps.length;
            for(var i = this.state.numSteps; i < steps.length; i++){
              squares[parseInt(steps[i].position)] = steps[i].piece;
            }
          }
          isYourTurn = ((numSteps % 2 === 0 ? 'X' : 'O') === role);

          if(steps.length > 0){
            this._checkNewStep({
              role:role,
              numSteps: numSteps,
              isYourTurn: isYourTurn,
              squares: squares,
              lastStep: null,
              online: online,
            });
          }else {
            this.setState({
              role: role,
              numSteps: numSteps,
              isYourTurn: isYourTurn,
              squares: squares,
              roundStatus: 'playing',
              modelStatus: null,
              modelMsg: null,
              modelButtonTip: null,
              online: online,
            });
          }

        }
        else
        {
          this.setState({
            squares: Array(9).fill(null),
            numSteps: 0,
            role: role,
            isYourTurn: false,
            roundStatus: 'waiting',
            modelStatus: null,
            modelMsg: null,
            modelButtonTip: null,
            online: online,
          });
        }
      }
    };
  _onOpponentDisconnect = () => {
    this._stopHeartBeat();
    this.setState({
      isYourTurn: false,
      modelStatus: 'gameOver',
      modelMsg: I18n.t('game.opponentDisconnect'),
      roundStatus: 'over',
    });
  };

  _onServerReset = () => {
    this._stopHeartBeat();
    this.setState({
      isYourTurn: false,
      modelStatus: 'gameOver',
      modelMsg: I18n.t('game.serverReset'),
      modelButtonTip: I18n.t('game.tryAgain'),
      roundStatus: 'over',
      online: 0,
    });
  };

  _onOffline = (online) => {
    this._stopHeartBeat();
    this.setState({
      isYourTurn: false,
      modelStatus: 'gameOver',
      modelMsg: I18n.t('game.selfDisconnect'),
      modelButtonTip: I18n.t('game.tryAgain'),
      roundStatus: 'over',
      online: online,
    });
  };

  _checkNewStep = (data) => {
    const {role, squares, numSteps, isYourTurn, lastStep, online} = data;
    let winner = this._calculateWinner(squares);
    console.log('_checkNewStep role:'+role);
    if(winner){
      this.setState({
        role: role,
        squares: squares,
        numSteps: numSteps,
        isYourTurn: false,
        modelStatus: 'gameOver',
        modelMsg: winner === role? I18n.t('game.success') : (winner === '='? I18n.t('game.draw') : I18n.t('game.failed')),
        roundStatus: 'over',
        online: online,
      });
      this._stopHeartBeat();
      this._setResult(winner,lastStep);
      DeviceEventEmitter.emit('refeshWinRate','');
    }
    else {
      this.setState({
        role: role,
        squares: squares,
        numSteps: numSteps,
        isYourTurn: isYourTurn,
        online: online,
      });
    }
  };

  _setResult = (winner,lastStep) => {
      if( this.state.roundStatus === 'over'){
        return;
      }

      const { putResult } = this.props;
      putResult({
        uuid: this.state.uuid,
        status: 'over',
        winner: winner,
        reason: 'P',
        lastStep: lastStep,
      });
    };

  _playPiece = (data) => {
    const { addStepNode } = this.props;
    if(data){
      this.lastPlay = data;
    }
    addStepNode(this.lastPlay);
  };

  _newGame = () => {
    this.setState({
        squares: Array(9).fill(null),
        numSteps: 0,
        isYourTurn: false,
        role: null,
        roundStatus: null,
        modelStatus: null,
        modelMsg: null,
        modelButtonTip: null,
    });
    this._startHeartBeat();
  };

  _renderInputButtons() {
      let views = [];

      for (var r = 0; r < inputButtons.length; r++) {
          let row = inputButtons[r];
          let inputRow = [];

          for (var i = 0; i < row.length; i++) {
              let input = row[i];

              inputRow.push(
                  <InputButton value={this.state.squares[input]}
                   onPress={this._onInputButtonPressed.bind(this, input)}
                  key={r + "-" + i} />
              );
          }
          views.push(<View style={GameStyle.inputRow} key={"row-" + r}>{inputRow}</View>)
      }
      return views;
  }

  _onInputButtonPressed = (input) => {
      //alert(input);
      if(!this.state.isYourTurn || this.state.roundStatus === 'over'){
        return;
      }

      const squares = this.state.squares;
      if(this._calculateWinner(squares) || squares[input] ){
          return;
      }
      const nextPiece = this.state.role;

      squares[input] = nextPiece;
      this._checkNewStep({
        role: this.state.role,
        squares: squares,
        numSteps: this.state.numSteps + 1,
        isYourTurn: !this.state.isYourTurn,
        lastStep: {
          uuid: this.state.uuid,
          index: this.state.numSteps+1,
          position: input,
          piece: nextPiece,
        },
        online: this.state.online,
      });

      this._playPiece({
        uuid: this.state.uuid,
        index: this.state.numSteps+1,
        position: input,
        piece: nextPiece,
      });
    };

  render(){
    const { isYourTurn } = this.state;
    const squares = this.state.squares;
    const winner = this._calculateWinner(squares)
    let status;
    if(winner){
        status = I18n.t('game.waiting');
    }
    else
    {
        status = this.state.isYourTurn ? I18n.t('game.yourTurn') : I18n.t('game.waiting') ;
    }
    return(
      <ImageBackground source={require('../../../images/default.jpg')} blurRadius={3} style={GameStyle.rootContainer}>
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <Text h2 style={fonts.customFont}>{status}</Text>
        </View>
        <View style={{flex: 3, justifyContent: 'center'}} >
          <View style={GameStyle.gameBoard}>{this._renderInputButtons()}</View>
        </View>
        <View style={{flex: 1}} />
        {this.state.modelStatus==='gameOver'?this._renderModal():null}
      </ImageBackground>
    )
  }

  _renderModal() {
    const { message, isOpen} = this.state;
    return (
      <Modal
        style={[GameStyle.messageModal, {backgroundColor: Colors.blue}]}
        position={"center"}
        ref={"result"}
        backdropPressToClose={false}
        isOpen={true}
        >
        <Text h4>{this.state.modelMsg}</Text>
        <TouchableOpacity
          style={[
            button.ModelBtn,
            {backgroundColor: Colors.lightBlue}
          ]}
          onPress={() => this._newGame()}
        >
          <Text h4 style={{color:'white'}}>{this.state.modelButtonTip? this.state.modelButtonTip:I18n.t('game.newRound')}</Text>
        </TouchableOpacity>
      </Modal>
    );
  }

  _calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if(this.state.numSteps >= 9){
      return '=';
    }
    return null;
  };

  _isWaiting = () => {
    if(!this.state.isYourTurn)
    {
      return false;
    }
    return true;
  };

}



const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchProps)(GameOnlineNode)
