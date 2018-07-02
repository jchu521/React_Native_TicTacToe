import React, { Component } from 'react';
import { TouchableOpacity, ImageBackground, ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { Text } from 'react-native-elements';

import PropTypes from 'prop-types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Fumi, Sae } from 'react-native-textinput-effects';
import { Colors } from '../../styles/colors'
import I18n from '../../languages/i18n';

import buttons from '../../styles/button';
import views from '../../styles/views';

export default class ContactScreen extends Component {
  state={
    name: '',
    email: '',
    message: '',
  }

  onSendEmail = () =>{
    console.log('123');
  }
  render() {
    return (
      <ImageBackground
        source={require('../../images/default.jpg')}
        style={views.container}
        contentContainerStyle={styles.content}
      >
        <View style={views.container}>
            <Text h3>{I18n.t('contact.form')}</Text>
        </View>

        <View style={[buttons.buttonGroup, {flex: 4}]}>
          <View style={styles.searchSection}>
              <Entypo style={styles.searchIcon} name="user" size={20} color="#000"/>
              <TextInput
                  style={styles.input}
                  placeholder="username"
                  onChangeText={(text) => {this.setState({name:text})}}
                  underlineColorAndroid="transparent"
              />
          </View>
          <View style={styles.searchSection}>
              <Entypo style={styles.searchIcon} name="mail" size={20} color="#000"/>
              <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={(text) => {this.setState({email:text})}}
                  underlineColorAndroid="transparent"
              />
          </View>
          <View style={styles.searchSection}>
              <Entypo style={styles.searchIcon} name="message" size={20} color="#000"/>
              <TextInput
                  style={styles.input}
                  placeholder="message"
                  onChangeText={(text) => {this.setState({message:text})}}
                  underlineColorAndroid="transparent"
                  multiline = {true}
                  minHeight={250}
                  maxHeight={250}
                  numberOfLines={5}
              />
          </View>


        </View>
        <TouchableOpacity
          style={[
            buttons.DefaultBtn,
            {backgroundColor: Colors.lightBlue, width:'80%'}
          ]}
          onPress={() => this.onSendEmail()}
        >
          <Text h3 style={{color:'white'}}>{I18n.t('contact.submit')}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  searchSection: {
    flexDirection: 'row',
    width:'80%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#404d5b',
},
searchIcon: {
    padding: 10,
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    // color: 'white',
},
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },

  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});



// <View style={[ { flex:1, padding:16, justifyContent:'center', }]}>
//   <Fumi
//     style={{height:50}}
//     label={'Name'}
//     iconClass={FontAwesomeIcon}
//     iconName={'user'}
//     iconColor={'#f95a25'}
//     textContentType={'username'}
//     onChangeText={(text) => this.setState({name: text})}
//   />
//   <Fumi
//     style={[styles.input,{height:50}]}
//     label={'Email'}
//     iconClass={Entypo}
//     iconName={'mail'}
//     iconColor={'#f95a25'}
//     textContentType={'emailAddress'}
//     onChangeText={(text) => this.setState({email: text})}
//   />
//   <Fumi
//     style={[styles.input,{ height: 150}]}
//     multiline = {true}
//     label={'Message'}
//     numberOfLines={5}
//     iconClass={Entypo}
//     iconName={'message'}
//     iconColor={'#f95a25'}
//     blurOnSubmit={false}
//     inputStyle={{height: 200}}
//     onChangeText={(text) => this.setState({message: text})}
//   />
// </View>


//
// <View style={[buttons.buttonGroup, {flex: 2}]}>
//   <View style={styles.searchSection}>
//       <Entypo style={styles.searchIcon} name="user" size={20} color="#000"/>
//       <TextInput
//           style={styles.input}
//           placeholder="username"
//           onChangeText={(text) => {this.setState({name:text})}}
//           underlineColorAndroid="transparent"
//       />
//   </View>
//   <View style={styles.searchSection}>
//       <Entypo style={styles.searchIcon} name="mail" size={20} color="#000"/>
//       <TextInput
//           style={styles.input}
//           placeholder="Email"
//           onChangeText={(text) => {this.setState({email:text})}}
//           underlineColorAndroid="transparent"
//       />
//   </View>
//   <View style={styles.searchSection}>
//       <Entypo style={styles.searchIcon} name="message" size={20} color="#000"/>
//       <TextInput
//           style={styles.input}
//           placeholder="message"
//           onChangeText={(text) => {this.setState({message:text})}}
//           underlineColorAndroid="transparent"
//           multiline = {true}
//           numberOfLines={5}
//       />
//   </View>
//
// </View>
