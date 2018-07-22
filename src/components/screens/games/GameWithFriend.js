import React from 'react';
import { ImageBackground, StyleSheet, View, Switch, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import InputButton from '../../utils/InputButton'
import GameStyle from '../../../styles/GameStyle'
import SwitchSelector from 'react-native-switch-selector';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modalbox';

import button from '../../../styles/button';
import text from '../../../styles/text';
import { Colors } from '../../../styles/colors';
import I18n from '../../../languages/i18n';
import {CheckWinner, _displayMessage} from '../../utils/checkWinner';
import DeviceInfo from 'react-native-device-info';

window.navigator.userAgent = 'react-native';
const io = require('socket.io-client/dist/socket.io');
//import {io} from 'socket.io-client/dist/socket.io';

const inputButtons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

export default class GameWithFriend extends React.Component {
  //modelStatus: 'gameOver','askForReplay', 'opponentWantReplay', 'opponentRefuseReplay', 'waitForNewGame'
  state = {
      uuid: null,
      squares: Array(9).fill(null),
      numSteps: 0,
      isYourTurn: null,
      role: null,
      roundIndex: 0,
      modelStatus: null,
      modelMsg: null,
      gameover: false,
  }

  componentWillUnmount() {
    this._webSocketClose();
    this._cancelResendInterval();
  }

  componentDidMount(){
      //get from api yourTurn, role= 'O' or 'X'
      this.setState({
        uuid: DeviceInfo.getUniqueID(),
        isYourTurn: false,
      })
      this._webSocketOpen();
  }

  _webSocketOpen = () => {
    this._socket = io('https://www.breakself.tech/?uuid='+DeviceInfo.getUniqueID(), {jsonp: false});

    this._socket.on('connect', this._onConnect);
    this._socket.on('disconnect', this._onDisconnect);
    this._socket.on('test', this._onTest);
    this._socket.on('play', this._onPlay);
    this._socket.on('replay', this._onRePlay);
    this._socket.on('setrole', this._onSetRole);
    this._socket.on('gamestart', this._onGameStart);
    this._socket.on('steps', this._onSteps);
  };

  _onConnect = () =>{
    console.log('connected!');
  };
  _onTest = (data) => {
    console.log(data);
    if(!data.pos || !data.piece){
      return;
    }
  };
  _onDisconnect = () =>{
    console.log('disconnected!');
  };
  _onPlay = (data) =>{
    console.log(data);
    if(!data.piece){
      return;
    }
    if(data.pos !== +data.pos){
      return;
    }
    if(this.resendEvent === 'play'){
      if(data.index === this.state.numSteps){
        this._cancelResendInterval();
      }
    }
    if(this.state.role === data.piece){
      return ;
    }
    const squares = this.state.squares;
    squares[data.pos] = data.piece;
    let winner = this._calculateWinner(squares);
    if(winner){
      this.setState({
        squares: squares,
        numSteps: this.state.numSteps+1,
        isYourTurn: false,
        gameOver: true,
        modelStatus: 'gameOver',
        modelMsg: winner === this.state.role? I18n.t('game.success') : (winner === '='? I18n.t('game.draw') : I18n.t('game.failed')),
      });
    }
    else {
      this.setState({
          squares: squares,
          numSteps: this.state.numSteps+1,
          isYourTurn: true,
      });
    }
    console.log(squares);
  };
  _onRePlay = (data) =>{
    console.log('RePlay');
    if(data.role !== this.state.role ){
      if(this.resendEvent === 'replay'){
        this._cancelResendInterval();
        this.setState({
          modelStatus: null,
          modelMsg: null,
        });
      }
      else
      {
        this.setState({
          modelStatus: 'opponentWantReplay',
          modelMsg: 'This player wants to play again!',
        });
      }
    }
  };
  _onRefuseToRePlay = (data) =>{
    console.log('RefuseToRePlay');
    if(data.role !== this.state.role ){
      if(this.resendEvent === 'replay'){
        this._cancelResendInterval();
      }
      this.setState({
        modelStatus: 'opponentRefuseReplay',
        modelMsg: 'This player refused to play again!',
      });
    }
  };
  _onAcceptToRePlay = (data) =>{
    console.log('RefuseToRePlay');
    if(data.role !== this.state.role ){
      if(this.resendEvent === 'replay'){
        this._cancelResendInterval();
      }
      this.setState({
        modelStatus: null,
        modelMsg: null,
      });
    }
  };
  _onSetRole = (role) =>{
    console.log('_onSetRole');
    console.log(role);
    if(!role || (role !== 'X' && role !== 'O')){
      return;
    }
    if(this.resendEvent === 'newgame'){
      this._cancelResendInterval();
    }
    this.setState({
        role: role,
        gameOver: false,
        squares: Array(9).fill(null),
        numSteps: 0,
        isYourTurn: null,
    });
  };
  _onGameStart = (index) => {
    console.log(this.state);
    console.log('index:'+index);
    this.setState({
      roundIndex: index,
      isYourTurn: this.state.role === 'X' ? true : false,
    });
  };
  _onSteps = (data) => {
    const steps = JSON.parse(data).steps;
    const squares = this.state.squares;
    console.log(steps);
    if(steps.length < this.state.numSteps && this.resendEvent === 'play'){
      this._resendInterval();
      return;
    }
    steps.forEach(function(step){
      squares[step.pos] = step.piece;
    });
    let nextIsX = steps.length % 2 === 0 ? true : false;
    let winner = this._calculateWinner(squares);
    if(winner){
      this.setState({
        squares: squares,
        numSteps: steps.length,
        isYourTurn: false,
        gameOver: true,
        modelStatus: 'gameOver',
        modelMsg: winner === this.state.role? I18n.t('game.success') : (winner === '='? I18n.t('game.draw') : I18n.t('game.failed')),
      });
    }
    else {
      this.setState({
        squares: squares,
        numSteps: steps.length,
        isYourTurn: this.state.role === 'X' ? nextIsX : !nextIsX,
      });
    }
  };

  _sendMessage = (ev, data) => {
    this._socket.emit(ev,data);
  }

  _playPiece = (pieceInfo) =>{
    this._startResendInterval('play',pieceInfo);
  };

  _gameOver = (resultInfo) =>{
    this._cancelResendInterval();
    this._sendMessage('gameover',resultInfo);
  };

  _newGame = () => {
    this._startResendInterval('newgame',{uuid:this.state.uuid});
    this.setState({
      modelStatus: null,
      modelMsg: null,
    });
  };
  _retryWithThisOpponent = () =>{
    this._startResendInterval('replay',{role: this.state.role, action:'askfor'});
  };

  _webSocketClose = () => {
    this._socket.close();
  };

  _resendInterval = () => {
    if(!this.resendEvent || !this.resendData)
    {
      return;
    }
    this._sendMessage(this.resendEvent,this.resendData);
  };

  _startResendInterval = (rEvent,rData) => {
    this.resendEvent = rEvent;
    this.resendData = rData;
    this._sendMessage(this.resendEvent,this.resendData);
    this._interval = setInterval(this._resendInterval, 5000);
  };

  _cancelResendInterval = () => {
    this.resendEvent = null;
    this.resendData = null;
    clearInterval(this._interval);
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
      this._socket.emit('test',input);

      if(!this.state.isYourTurn){
        return;
      }

      const squares = this.state.squares;
      if(this._calculateWinner(squares) || squares[input] ){
          return;
      }

      squares[input] = this.state.role;
      let winner = this._calculateWinner(squares);
      if(winner){
        this.setState({
          squares: squares,
          numSteps: this.state.numSteps+1,
          isYourTurn: false,
          gameOver: true,
          modelStatus: 'gameOver',
          modelMsg: winner === this.state.role? I18n.t('game.success') : (winner === '='? I18n.t('game.draw') : I18n.t('game.failed')),
        });
      }
      else {
        this.setState({
            squares: squares,
            numSteps: this.state.numSteps+1,
            isYourTurn: !this.state.isYourTurn,
        });
      }
      this._playPiece({index: this.state.numSteps+1, pos:input, piece:this.state.role});

    };

  render(){
    const { isYourTurn } = this.state;
    const squares = this.state.squares;
    const winner = this._calculateWinner(squares)

    let status;
    if(winner){
        this._gameOver({
          winner: winner,
          reason: 'P',
        });
        status = I18n.t('game.waiting');
    }
    else
    {
        status = this.state.isYourTurn ? I18n.t('game.yourTurn') : I18n.t('game.waiting') ;
    }
    return(
      <ImageBackground source={require('../../../images/default.jpg')} style={GameStyle.rootContainer}>
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <Text h2 >{status}</Text>
        </View>
        <View style={{flex: 3, justifyContent: 'center'}} >
          <View style={GameStyle.gameBoard}>{this._renderInputButtons()}</View>
        </View>
        <View style={{flex: 1}} />

        <Modal
          style={[GameStyle.messageModal, {backgroundColor: Colors.blue}]}
          position={"center"}
          ref={"result"}
          backdropPressToClose={false}
          isOpen={this.state.modelStatus==='gameOver'}
          >
          <Text h2>{this.state.modelMsg}</Text>
          <TouchableOpacity
            style={[
              button.ModelBtn,
              {backgroundColor: Colors.lightBlue}
            ]}
            onPress={() => this._newGame()}
          >
            <Text h4 style={{color:'white'}}>{'New Game'}</Text>
          </TouchableOpacity>
        </Modal>

      </ImageBackground>
    )
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
