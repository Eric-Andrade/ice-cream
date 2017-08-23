import React from 'react';
import { UIManager, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import { store, client } from './src/store';
import { colors } from './src/utils/constants';

import AppNavigation from './src/navigations'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  _checkIfToken = async() =>{
    try {
        const token = await AsyncStorage.getItem('@icecream');
        if(token !== null){
          store.dispatch({type: 'LOGIN'})
        }
    } catch (error) {
        throw error
    }
  }
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <ThemeProvider theme={colors}>
          <AppNavigation />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
