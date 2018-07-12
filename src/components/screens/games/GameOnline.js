import React from 'react';
import { ImageBackground, StyleSheet, View, Switch, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import InputButton from '../../utils/InputButton'
import GameStyle from '../../../styles/GameStyle'

import button from '../../../styles/button';
import text from '../../../styles/text';
import I18n from '../../../languages/i18n';
import {CheckWinner, _displayMessage} from '../../utils/checkWinner';
import DeviceInfo from 'react-native-device-info';

import { bindActionCreators } from "redux";
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import { AsyncStorage, DeviceEventEmitter } from 'react-native';

const inputButtons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

class GameOnline extends React.Component {
  state = {
      uuid: null,
      squares: Array(9).fill(null),
      numSteps: 0,
      isYourTurn: null,
      mark: null,
      roundId: null,
      roundStatus: null,
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  componentDidMount(){
      //get from api yourTurn, mark= 'O' or 'X'
      this.setState({
        uuid: DeviceInfo.getUniqueID(),
        isYourTurn: false,
      })
      this._newGame(DeviceInfo.getUniqueID());
      this._interval = setInterval(this._heartBeatInterval, 1000);
      console.log(I18n);
  }


  _heartBeatInterval = () => {
      const { getSteps, newGame } = this.props;
      //console.log('_getStepsInterval roundId:'+this.state.roundId+' userId:'+this.state.userId+' roundIsOver:'+this.state.roundIsOver);
      if(!this.state.roundId || this.state.roundStatus === 'waiting'){
        newGame({
          uuid: this.state.uuid
        });
      }else{
        if(this.state.roundId && this.state.roundStatus === 'playing'){
          getSteps({
            roundId: this.state.roundId,
            uuid: this.state.uuid
          });
        }
      }
    };

  _newGame = (uuid) => {
      const { newGame } = this.props;
      newGame({
        uuid: uuid
      });
    };

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    //console.log(this.state);
    this._newGameHandler(nextProps);
    this._stepsHandler(nextProps);
    this._miscHandler(nextProps);
  }

  _newGameHandler = (nextProps)=> {
    if(nextProps.game){
      if(nextProps.game[0]['status'] && nextProps.game[0]['status'] === 'waiting'){
        this.setState({
          squares: Array(9).fill(null),
          roundId: nextProps.game[0]['id'],
          mark: nextProps.game[0]['role'] === 'x_user' ? 'X' : 'O',
          roundStatus: 'waiting',
        });
      }
      else
      {
        this.setState({
          squares: Array(9).fill(null),
          roundId: nextProps.game[0]['id'],
          mark: nextProps.game[0]['x_user'] === this.state.uuid ? 'X' : 'O',
          roundStatus: 'playing',
        });
      }
    }
  };

  _stepsHandler = (nextProps) =>{
      if(nextProps.steps){
        let isYourTurn = false;
        let numSteps = this.state.numSteps;
        let squares = this.state.squares;
        if(nextProps.steps.length > this.state.numSteps){
          numSteps = nextProps.steps.length;
          for(var i = this.state.numSteps; i < nextProps.steps.length; i++){
            squares[parseInt(nextProps.steps[i].position)] = nextProps.steps[i].piece;
          }
        }

        isYourTurn = ((numSteps % 2 === 0 ? 'X' : 'O') === this.state.mark);
        this.setState({
          numSteps: numSteps,
          isYourTurn: isYourTurn,
          squares: squares,
        });
      }
    };

  _miscHandler(nextProps){
        if(nextProps.misc && nextProps.misc.round_over && nextProps.misc.status && this.state.roundStatus !== 'over'){
          this.setState({
            roundStatus: 'over',
          });
        }
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
      if(!this.state.isYourTurn){
        return;
      }

      const squares = this.state.squares;
      if(this._calculateWinner(squares) || squares[input] ){
          return;
      }
      const nextPiece = this.state.mark;
      squares[input] = nextPiece;
      this.setState({
          squares: squares,
          numSteps: this.state.numSteps + 1,
          isYourTurn: !this.state.isYourTurn,
      });
      const { addStep } = this.props;
      addStep({
        roundId: this.state.roundId,
        position: input,
        piece: nextPiece,
      })
    };

  render(){
    const { isYourTurn } = this.state;
    const squares = this.state.squares;
    const winner = this._calculateWinner(squares)
    let status;
    if(winner){
        status = winner === this.state.mark? I18n.t('game.success') : I18n.t('game.failed');
    }
    else if(this.state.numSteps >= 9){
      status = I18n.t('game.draw');
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
      </ImageBackground>
    )
  }

  _setRoundResult = (winner) => {
      if( this.state.roundStatus === 'over'){
        return;
      }

      const { putRoundResult } = this.props;
      putRoundResult({
        winner: winner,
        roundId: this.state.roundId,
      });
    };
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
        this._setRoundResult(squares[a]);
        return squares[a];
      }
    }
    if(this.state.numSteps >= 9){
      this._setRoundResult('=');
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

export default connect(mapStateToProps, mapDispatchProps)(GameOnline)
