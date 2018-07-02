import React, { Component } from 'react';
import { TouchableHighlight} from 'react-native';
import { Text } from 'react-native-elements';


import GameStyle from '../../styles/GameStyle';

export default class InputButton extends Component {
    render() {
      return (
        <TouchableHighlight style={GameStyle.gameboardButton} underlayColor="#193441" onPress={this.props.onPress}>
          <Text h1 style={[GameStyle.gameboardButtonText, {color: this.props.value =='X' ? 'blue' :'red' }]}>{this.props.value}</Text>
        </TouchableHighlight>
      )
    }

}
