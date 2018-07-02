import React from 'react';
import { ImageBackground, StyleSheet, View, Switch, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import I18n from '../../../languages/i18n';
import SwitchSelector from 'react-native-switch-selector';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modalbox';

import {CheckWinner, _displayMessage} from '../../utils/checkWinner';
import InputButton from '../../utils/InputButton';
import GameStyle from '../../../styles/GameStyle';
import button from '../../../styles/button';
import text from '../../../styles/text';
import { Colors } from '../../../styles/colors';

const inputButtons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

export default class GameAiMode extends React.Component {
    state = {
        squares: Array(9).fill(null),
        xIsNext: false,
        mark: false,
        isOpen: false,
        message:null,
        modeTitle:null,
        gameLevel: null,
    }

    componentDidMount(){
      const { level } = this.props.navigation.state.params;

      switch (level) {
        case 'EASY':
          this.setState({modeTitle: I18n.t('game.easy'), gameLevel: 5});
          break;
        case 'MEDIUM':
          this.setState({modeTitle: I18n.t('game.medium'), gameLevel: 2});
          break;
        case 'HARD':
          this.setState({modeTitle: I18n.t('game.hard'), gameLevel: 1});
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

    // _displayMessage = (message) => {
    //   switch (message) {
    //     case 'Win':
    //       this.setState({message: I18n.t('game.success'), isOpen:true});
    //       break;
    //     case 'Loss':
    //       this.setState({message: I18n.t('game.failed'), isOpen:true});
    //       break;
    //     case 'Draw':
    //       this.setState({message: I18n.t('game.draw'), isOpen:true});
    //       break;
    //   }
    // }

    render() {
        const { mark, message, isOpen, modeTitle } = this.state;

        return (
          <ImageBackground source={require('../../../images/default.jpg')} style={GameStyle.rootContainer}>
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
              <Text h1 >{modeTitle}</Text>
            </View>
            <View style={[GameStyle.rootContainer,{width: '60%'}]}>
              <Text style={{fontSize: 16, marginBottom:10, color:'blue'}} >Select Nought or Cross</Text>
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
            <View style={{flex: 3, justifyContent: 'center'}} >
              <View style={GameStyle.gameBoard}>{this._renderInputButtons()}</View>
            </View>
            <View style={{flex: 1}} />
            <Modal
              style={[GameStyle.messageModal, {backgroundColor: Colors.blue}]}
              position={"center"}
              ref={"result"}
              backdropPressToClose={false}
              isOpen={isOpen}
              >
              <Text h2>{message}</Text>
              <TouchableOpacity  style={{marginTop:20}} onPress={() => this._onReset()}>
                <Image source={require('../../../images/ResetButton.png')}/>
              </TouchableOpacity>
            </Modal>
          </ImageBackground>
        );
    }

    _onReset(){
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: this.state.mark,
            isOpen: !this.state.isOpen,

        });
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

    // _calculateWinner(squares) {
    //   const lines = [
    //     [0, 1, 2],
    //     [3, 4, 5],
    //     [6, 7, 8],
    //     [0, 3, 6],
    //     [1, 4, 7],
    //     [2, 5, 8],
    //     [0, 4, 8],
    //     [2, 4, 6]
    //   ];
    //
    //   for (let i = 0; i < lines.length; i++) {
    //     const [a, b, c] = lines[i];
    //     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //       const { mark } = this.state;
    //
    //       mark ?
    //         (squares[a] === 'X'? this._displayMessage('Win') : this._displayMessage('Loss'))
    //         :(squares[a] === 'O'? this._displayMessage('Win') : this._displayMessage('Loss'))
    //
    //       return squares[a];
    //     }
    //   }
    //   return null;
    // }

	_calculateWeight(squares) {
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
			  if(squares[i] === 'O'){
				  testArr[i] = 'c';
			  }
			  else if(squares[i] === 'X'){
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
        if(m = CheckWinner(squares, this.state.mark)){
          this.setState({isOpen:true, message: m});
          return ;
        }
        // if(this._calculateWinner(squares)){
        //   return ;
        // }
        let pos = this._calculateWeight(squares);

        console.log(pos);
        // if(squares[pos]){
        //     this._displayMessage('Draw');
        //     return;
        // }
        if(squares[pos]){
            m = _displayMessage('Draw');
            this.setState({isOpen:true, message: m});
            return;
        }
        squares[pos] = this.state.xIsNext?'X':'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        })
        // if(this._calculateWinner(squares)){
        //   return ;
        // }
        if(m = CheckWinner(squares, this.state.mark)){
          this.setState({isOpen:true, message: m});
          return ;
        }
    }

    _onInputButtonPressed(input) {
        const squares = this.state.squares;

        if(CheckWinner(squares, this.state.mark) || squares[input]){
          return ;
        }

        // if(this._calculateWinner(squares) || squares[input] ){
        //     return;
        // }
        squares[input] = this.state.xIsNext?'X':'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
		    setTimeout(()=>{this._autoClickForAi()},100);
        // if(this._calculateWinner(squares)){
        //   return ;
        // }
        if(CheckWinner(squares, this.state.mark)){
          return ;
        }
    }

}
