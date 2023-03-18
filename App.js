import { View, Text } from 'react-native'
import React from 'react'
import Router from './src/Router'
import { Colors } from './src/Theme'
import { Provider } from 'react-redux';
import configureStore from './configureStore';
const store = configureStore();
const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.mainbg
      }}
    >
      <Provider store={store}>
        <Router />
      </Provider>
    </View>
  )
}

export default App