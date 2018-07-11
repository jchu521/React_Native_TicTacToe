import React, { Component } from 'react';
import AppStack from './src/components/navigations/AppStack';
import { Provider } from 'react-redux';
import configureStore from './src/components/store/configureStore'

const store = configureStore();
type Props = {};
export default class App extends Component<Props> {

  render() {

    return (
      <Provider store={store} >
        <AppStack />
      </Provider>
    );
  }
}
