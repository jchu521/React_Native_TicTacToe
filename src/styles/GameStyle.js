import { StyleSheet, Dimensions } from 'react-native';

let buttonSize = Dimensions.get('window').width*0.8/3;

var GameStyle = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    displayContainer: {
        flex: 2,
        backgroundColor: '#193441',
        justifyContent: 'center',
        alignItems: 'center',
    },

    //displayContainer
    footer: {
        flex: 1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    //not use anymore
    displayText: {
        color: 'white',
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        flex: 8,
        backgroundColor: '#3E606F'
    },

    inputButton: {
        width: buttonSize,
        height: buttonSize,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'white',
    },

    // oringal inputContainer
    gameBoard: {
        width: buttonSize*3,
        height:  buttonSize*3,
        backgroundColor: '#18B1CC',
        opacity:0.6,
    },

    //inputButton
    gameboardButton: {
        width: buttonSize,
        height: buttonSize,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'white',
    },

    //inputButtonText
    gameboardButtonText: {
      fontWeight: 'bold',
    },

    //modal displaywin
    messageModal:{
      justifyContent: 'center',
      alignItems: 'center',
      height: 200,
      width: '100%',
      opacity:0.8
    },
    
    inputButtonText: {
        fontSize: 54,
        fontWeight: 'bold',
        color: 'white'
    },

    inputRow: {
        flex: 1,
        flexDirection: 'row'
    },

    aiModeText: {
        color: 'white',
        fontSize: 34,
        textAlign: 'center',
        padding: 20
    },

    aiModeList:{
      flex: 1,
      flexDirection: 'row',
      padding: 5,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },

    aiModeTextSelected: {
      color: 'red',
      fontWeight: 'bold',
      fontSize: 34,
      textAlign: 'center',
      padding: 20
    }

});

export default GameStyle;
