import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight
} from 'react-native';

import GameStyle from '../../styles/GameStyle';

export default class InputButton extends Component {

    render() {
        return (
	        <TouchableHighlight style={GameStyle.inputButton} underlayColor="#193441" onPress={this.props.onPress}>
                <Text style={GameStyle.inputButtonText}>{this.props.value}</Text>
            </TouchableHighlight>
        )
    }

}
