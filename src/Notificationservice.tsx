import {PermissionsAndroid} from 'react-native';
import notifee from '@notifee/react-native';
import { getAsyncStorage } from './Utils';
import { USERINFO } from './Asynckey';


export const notification_permissionandroid=()=>{
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

}

export const display_notification=(message:string,title:string)=>{

    getAsyncStorage(USERINFO).then(async() => {

        // await notifee.requestPermission()
    
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
    
        // Display a notification
        await notifee.displayNotification({
          title: title,
          body: message,
          android: {
            channelId,
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
              id: 'default',
            },
          },
        });
    })
     // Request permissions (required for iOS)
}