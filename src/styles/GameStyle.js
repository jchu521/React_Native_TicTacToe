import { StyleSheet } from 'react-native';

var GameStyle = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    displayContainer: {
        flex: 2,
        backgroundColor: '#193441',
        justifyContent: 'center',
        alignItems: 'center',
    },

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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
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
