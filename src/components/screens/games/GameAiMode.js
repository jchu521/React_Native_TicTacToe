import React from 'react';
import { ImageBackground, StyleSheet, View, Switch, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import I18n from '../../../languages/i18n';
import SwitchSelector from 'react-native-switch-selector';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modalbox';

import InputButton from '../../utils/InputButton';
import GameStyle from '../../../styles/GameStyle';
import button from '../../../styles/button';
import text from '../../../styles/text';
import { Colors } from '../../../styles/colors';
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

class GameAiMode extends React.Component {
    state = {
        squares: Array(9).fill(null),
        xIsNext: false,
        mark: false,
        isOpen: false,
        message: null,
        gameLevel: 5,
    }

    componentDidMount(){
        this.steps = [];
    }

    _selectGameMode = (value) => {
      switch (value) {
        case 'EASY':
          this.setState({gameLevel: 5, squares: Array(9).fill(null)});
          break;
        case 'MEDIUM':
          this.setState({gameLevel: 2, squares: Array(9).fill(null)});
          break;
        case 'HARD':
          this.setState({gameLevel: 1, squares: Array(9).fill(null)});
          break;
      }
    }

    _selectNoughtOrCross = (value) => {
      this.setState({
        xIsNext: value,
        mark: value,
        squares: Array(9).fill(null),
      });
    }

    _displayMessage = (message) => {
      if(this.state.isOpen) {
        return;
      }
      switch (message) {
        case 'Win':
          this.setState({message: I18n.t('game.success'), isOpen:true});
          this._gameOver(this.state.mark?'X':'O');
          break;
        case 'Loss':
          this.setState({message: I18n.t('game.failed'), isOpen:true});
          this._gameOver(this.state.mark?'O':'X');
          break;
        case 'Draw':
          this.setState({message: I18n.t('game.draw'), isOpen:true});
          this._gameOver('=');
          break;
      }
    }

    _gameOver = (winner) => {
      if(this.steps.length < 1){
        return;
      }
      var data = {};
      data.uuid = DeviceInfo.getUniqueID();
      data.role = this.state.mark?'X':'O';
      data.winner = winner;
      data.steps = [];
      for(var i = 0; i < this.steps.length; i++){
        data.steps.push({
          index: i+1,
          position: this.steps[i].position,
          piece: this.steps[i].piece,
        });
      }
      this._postResult(data);
    };
    _postResult = (data) => {
      console.log(data);
      const { postAIResult } = this.props;
      postAIResult(data);
    };

    _playPiece = (data) => {
      this.steps.push(data);
    };

    render() {
        const { mark, isOpen } = this.state;
        return (
          <ImageBackground source={require('../../../images/default.jpg')} blurRadius={3} style={[GameStyle.rootContainer]}>
            <View style={[GameStyle.rootContainer,{width: '60%', flex: 1, paddingTop: 20}]}>
              <Text style={{fontSize: 16, marginBottom:10, color:'blue'}} >{I18n.t('game.selectMode')}</Text>
              <SwitchSelector
                initial={0}
                onPress={ (value) => this._selectGameMode(value)}
                selectedColor={'white'}
                buttonColor={Colors.purple}
                borderColor={Colors.purple}
                options={[
                  { label: I18n.t('game.easy'), value: 'EASY' },
                  { label: I18n.t('game.medium'), value: 'MEDIUM' },
                  { label: I18n.t('game.hard'), value: 'HARD' },
                ]}
              />
              <Text style={{fontSize: 16, marginBottom:10, color:'blue'}} >{I18n.t('game.selectOorX')}</Text>
              <SwitchSelector
                initial={0}
                onPress={ (value) => this._selectNoughtOrCross(value)}
                selectedColor={Colors.purple}
                buttonColor={Colors.purple}
                borderColor={Colors.purple}
                options={[
                  { label: <Entypo name="circle" size={25} color= {mark ? 'black':'red'} />, value: false },
                  { label: <Entypo name="cross" size={35} color= {mark ? 'blue':'black'} />, value: true }
                ]}
              />
            </View>
            <View style={{flex: 3, justifyContent: 'center', alignItems:'center'}} >
              <View style={GameStyle.gameBoard}>{this._renderInputButtons()}</View>
            </View>
            {isOpen?this._renderModal():null}
          </ImageBackground>
        );
    }

    _onReset(){
        this.steps = [];
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: this.state.mark,
            isOpen: !this.state.isOpen,
        });
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
          swipeToClose={false}
          >
          <Text h2>{message}</Text>
          <TouchableOpacity  style={{marginTop:20}} onPress={() => this._onReset()}>
            <Image source={require('../../../images/ResetButton.png')}/>
          </TouchableOpacity>
        </Modal>
      );
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

    _calculateWinner(squares) {
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
          const { mark } = this.state;

          mark ?
            (squares[a] === 'X'? this._displayMessage('Win') : this._displayMessage('Loss'))
            :(squares[a] === 'O'? this._displayMessage('Win') : this._displayMessage('Loss'))

          return squares[a];
        }
      }
      return null;
    }

	_calculateWeight(squares) {
      let role = this.state.mark ? 'O' : 'X';
      let opponentRole = this.state.mark ? 'X' : 'O';
		  const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		  ];
		  let testArr = Array(9).fill(0);
		  let results = Array(9).fill(0);

		  let refVals = [];
		  refVals['aaa'] = 2;
		  refVals['aab'] = 10;
		  refVals['aac'] = 100;
		  refVals['abb'] = 1000;
		  refVals['acc'] = 10000;
		  refVals['abc'] = 1;

		  for ( let i = 0; i < squares.length; i++){
			  if(squares[i] === role){
				  testArr[i] = 'c';
			  }
			  else if(squares[i] === opponentRole){
				  testArr[i] = 'b';
			  }
			  else{
				  testArr[i] = 'a';
			  }
		  }
		  for (let i = 0; i < lines.length; i++) {
  			const [a, b, c] = lines[i];
  			let vals = [testArr[a],testArr[b],testArr[c]];
  			for ( var key in refVals){
  				if(vals.sort().join('') === key){
  					if(squares[a] === null){
  						results[a] += refVals[key];
  					}
  					if(squares[b] === null){
  						results[b] += refVals[key];
  					}
  					if(squares[c] === null){
  						results[c] += refVals[key];
  					}
  					break;
  				}
  			}
		  }
      //Deal with special conditions
      if(testArr.join('') === 'baaacaaab' || testArr.join('') === 'aabacabaa'){
    	  results[1] += 100;
        results[3] += 100;
        results[5] += 100;
        results[7] += 100;
      }

      // let pos = this._getPosByAiLevel(results,this.state.isHardMode ? 1 : 5);
      let pos = this._getPosByAiLevel(results, this.state.gameLevel);


		  return pos;
		}

    _getPosByAiLevel(posArr,rval=1){
      //console.log("_getPosByAiLevel 1:"+posArr);
      let rtns = [];
      let maxVal = Math.max(...posArr);
      //console.log("_getPosByAiLevel 2:"+posArr+" :max:"+maxVal);
      let numOfVal = posArr.filter((val)=> val >= maxVal).length;
      //console.log("_getPosByAiLevel 3:"+posArr+" :numOfVal:"+numOfVal);
      if(numOfVal < rval && posArr.filter((val)=>val > 0).length > numOfVal){
        let tmpArr = posArr.filter((val)=>val > 0).sort((a,b)=> a < b ).slice(0,rval);
        maxVal = tmpArr[tmpArr.length - 1];
      }
      posArr.forEach((item,index)=> item >= maxVal && rtns.push(index));
      let rnum = Math.floor(Math.random() * rtns.length);
      let pos = rtns[rnum];
      console.log("_getPosByAiLevel 5:"+rtns+" :pos:"+pos+" rnum:"+rnum);
      return pos;
    }

    _autoClickForAi(){
	    const squares = this.state.squares;

        if(this._calculateWinner(squares)){
          return ;
        }
        let pos = this._calculateWeight(squares);
        console.log('autoClickForAi pos:'+pos);
        if(squares[pos]){
            this._displayMessage('Draw');
            return;
        }

        squares[pos] = this.state.xIsNext?'X':'O';
        this._playPiece({
          position: pos,
          piece: squares[pos],
        });
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        })
        if(this._calculateWinner(squares)){
          return ;
        }

    }

    _onInputButtonPressed(input) {
        const squares = this.state.squares;

        if(this._calculateWinner(squares) || squares[input] ){
            return;
        }
        squares[input] = this.state.xIsNext?'X':'O';
        this._playPiece({
          position: input,
          piece: squares[input],
        });
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
		    setTimeout(()=>{this._autoClickForAi()},100);
        if(this._calculateWinner(squares)){
          return ;
        }

    }

}


const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchProps)(GameAiMode)
