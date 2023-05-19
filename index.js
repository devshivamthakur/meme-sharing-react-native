/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { display_notification } from './src/Notificationservice';
messaging().setBackgroundMessageHandler(async remoteMessage => {
    display_notification(remoteMessage.notification.body, remoteMessage.notification.title)
});
AppRegistry.registerComponent(appName, () => App);
