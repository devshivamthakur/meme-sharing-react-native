import { View, Text } from 'react-native'
import React from 'react'
import Router from './src/Router'
import { Colors } from './src/Theme'
import { Provider } from 'react-redux';
import { store } from './Store';
import FlashMessage from "react-native-flash-message";

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
      <FlashMessage position="top" />
    </View>
  )
}

export default App