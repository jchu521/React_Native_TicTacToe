import React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import InputButton from '../utils/InputButton'
import GameStyle from '../../style/GameStyle'
import button from '../../style/button';
import text from '../../style/text';
import I18n from '../../language/i18n';

const inputButtons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

export default class GameAiMode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            isAiMode: true,
            isHardMode: false,
        }
    }

    render() {
        const squares = this.state.squares;
        const winner = this._calculateWinner(squares)
        let status;
        console.log(I18n);
        if(winner){
            status = <Text style={GameStyle.displayText}>{winner === 'O'? I18n.t('game.failed') : I18n.t('game.success')}</Text>
        }
        else
        {
            status =
            <View  style={GameStyle.aiModeList}>
              <View style={GameStyle.aiModeList}>
                <Text style={this.state.isHardMode? GameStyle.aiModeText : GameStyle.aiModeTextSelected}>{I18n.t('game.easy')}</Text>
              </View>
              <View style={GameStyle.aiModeList}>
                <Switch onValueChange={(value)=>this._onSwitchButtenPressed(value)} value={this.state.isHardMode}/>
              </View>
              <View style={GameStyle.aiModeList}>
                <Text style={this.state.isHardMode? GameStyle.aiModeTextSelected: GameStyle.aiModeText}>{I18n.t('game.hard')}</Text>
              </View>
            </View>
        }
        return (
            <View style={GameStyle.rootContainer}>
                <View style={GameStyle.displayContainer}>
                    {status}
                </View>
                <View style={GameStyle.inputContainer}>
                    {this._renderInputButtons()}
                </View>
                <View style={GameStyle.displayContainer}>
                  <TouchableOpacity style={[button.HomeLoginBtn, button.DefaultBtn]} onPress={() => this._onReset()}>
                      <Text style={[text.HomeTxt,{color:'white'}]}>{I18n.t('game.reset')}</Text>
                  </TouchableOpacity>
                </View>
            </View>
        );
    }
    _onReset(){
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true
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
          return squares[a];
        }
      }
      return null;
    }

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

		  //let pos = results.reduce(function(maxest,next,index){
				//return next > results[maxest] ? index : maxest;
			  //},0);
		  //console.log(pos);
		  //let testPos = results.indexOf(Math.max.apply(Math,results));
		  //console.log(testPos);
      let pos = this._getPosByAiLevel(results,this.state.isHardMode ? 1 : 5);

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
        if(this.state.isAiMode){
            if(this.state.xIsNext)
            {
                return;
            }
        }
	    const squares = this.state.squares;
        if(this._calculateWinner(squares)){
  		    return ;
  	    }
        let pos = this._calculateWeight(squares);
        console.log(pos);
        if(squares[pos]){
            console.log("Game Over!");
            return;
        }
        squares[pos] = this.state.xIsNext?'X':'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        })
    }

    _onInputButtonPressed(input) {
        //alert(input);
        const squares = this.state.squares;
        if(this._calculateWinner(squares) || squares[input] ){
            return;
        }
        squares[input] = this.state.xIsNext?'X':'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
		setTimeout(()=>{this._autoClickForAi()},100);
    }

    _onSwitchButtenPressed(value){
      this.setState({
        isHardMode:value
      });
    }

}
