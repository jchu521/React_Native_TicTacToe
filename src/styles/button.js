import { StyleSheet } from 'react-native';
import { Colors } from './colors'

const button = StyleSheet.create({
    //Default btn
    DefaultBtn:{
      width: '90%',
      height: 50,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:10,
      marginTop: 10
    },

    ModelBtn:{
      width: '80%',
      height: 60,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:10,
      marginTop: 10
    },

    buttonGroup: {
      flex: 3,
      justifyContent:'center',
      alignItems: 'center',
      width:'80%',
      backgroundColor:Colors.rice,
      borderColor: Colors.brown,
      borderRadius: 20,
      borderWidth: 5,
      marginBottom: '10%',
    },

    //Home page
    HomeSignUpBtn:{
        borderWidth: 1.5,
        borderColor:'#00BFFF',
    },

    HomeLoginBtn:{
        backgroundColor: '#00BFFF',
   },



});
export default button;
