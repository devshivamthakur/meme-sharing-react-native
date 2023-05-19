import { View, Text, Platform } from 'react-native'
import React, { useEffect } from 'react'
import Router from './src/Router'
import { Colors } from './src/Theme'
import { Provider } from 'react-redux';
import { store } from './Store';
import FlashMessage from "react-native-flash-message";
import { notification_permissionandroid } from './src/Notificationservice';
import messaging from '@react-native-firebase/messaging';

const App = () => {

  useEffect(() => {
    if (Platform.Version > 33) {
      notification_permissionandroid()
    }

  }, [])  

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      display_notification(remoteMessage.notification.body, remoteMessage.notification.title)
    });

    return unsubscribe;
  }, []);


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