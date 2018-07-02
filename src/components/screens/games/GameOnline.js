import React from 'react';
import { ImageBackground, StyleSheet, View, Switch, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import InputButton from '../../utils/InputButton'
import GameStyle from '../../../styles/GameStyle'

import button from '../../../styles/button';
import text from '../../../styles/text';
import I18n from '../../../languages/i18n';
import {CheckWinner, _displayMessage} from '../../utils/checkWinner';

const inputButtons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

export default class GameOnline extends React.Component {
  state = {
      squares: Array(9).fill(null),

      isYourTurn: null,
      mark: null,
  }

  componentDidMount(){
      //get from api yourTurn, mark= 'O' or 'X'
      this.setState({
        isYourTurn: false,
        mark: 'X',
      })
  }

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

  _onInputButtonPressed(input) {
      const squares = this.state.squares;

      squares[input] = this.state.mark;
      this.setState({
          squares: squares,
          isYourTurn: !this.state.isYourTurn,
      });

  }

  render(){
    const { isYourTurn } = this.state;

    return(
      <ImageBackground source={require('../../../images/default.jpg')} style={GameStyle.rootContainer}>
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <Text h2 >{isYourTurn ? 'Your Turn' : 'Waiting...'}</Text>
        </View>
        <View style={{flex: 3, justifyContent: 'center'}} >
          <View style={GameStyle.gameBoard}>{this._renderInputButtons()}</View>
        </View>
        <View style={{flex: 1}} />
      </ImageBackground>
    )
  }
}
