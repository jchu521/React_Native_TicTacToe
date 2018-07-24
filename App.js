import React, { Component } from 'react';
import AppStack from './src/components/navigations/AppStack';
import { Provider } from 'react-redux';
import configureStore from './src/components/store/configureStore'
import * as Progress from 'react-native-progress';
import { Colors } from './src/styles/colors'
import codePush from 'react-native-code-push'
import { Text, View, AsyncStorage, DeviceEventEmitter } from 'react-native';

const store = configureStore();
type Props = {};

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

class App extends Component<Props> {

  componentWillMount(){
    // codePush.notifyAppReady();
    // this._retrieveData();
  }

  _retrieveData = async () => {
      const value = await AsyncStorage.getItem('AutoUpdate');

      if (value === null) {
        //auto update
        // codePush.sync();
        //used for testing App to see the steps
        codePush.sync({ updateDialog: true },
          (status) => {
            switch (status) {
                case codePush.SyncStatus.UP_TO_DATE :
                  console.log('No new update');
                    break;
                case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                    // Show "downloading" modal
                    console.log('downloading');
                    // this.refs.update.open();
                    break;
                case codePush.SyncStatus.INSTALLING_UPDATE:
                    console.log('Installing');
                    codePush.restartApp();
                    // this.refs.update.close();
                    break;
              }
          }
        );
      }
      console.log(value);
  }

  render() {

    return (
      <Provider store={store} >
          <AppStack
            onNavigationStateChange={(prevState, currentState) => {

              let route = currentState;
              while (route.routes) {
                route = route.routes[route.index];
              }
              DeviceEventEmitter.emit('routeStateChanged', route);
            }}
          />
      </Provider>
    );
  }
}

export default App;
