import { StyleSheet } from 'react-native';


const button = StyleSheet.create({
    //Default btn
    DefaultBtn:{
      width: '90%',
      height: 70,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:10,
      marginTop: 10
    },

    buttonGroup: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
      width:'80%',
      backgroundColor:'#E8E2B3',
      borderColor:'#B9B388',
      borderRadius: 20,
      borderWidth: 5,
      marginBottom: '10%',
      marginTop: '40%'
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
