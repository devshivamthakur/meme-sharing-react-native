import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './Screens/Splash/Splash';
import Auth from './Screens/Auth/Auth';
import Filluserinfo from './Screens/FillUserInfo/Filluserinfo';
import Home from './Screens/Home/Home';
import { MyTabs } from './Tabs';
import Settings from './Screens/Settings/Settings';
import Create from './Screens/Create/Create';
import { EditProfile } from './Screens/Editprofile/Editprofile';
import StaticManagement from './Screens/StaticManagement/StaticManagement';
import BlockedAccountsScreen from './Screens/BlockedAccounts/BlockedAccountsScreen';
import Deactivateaccount from './Screens/DeactivateAccount/Deactivateaccount';
export type AppStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Filluserinfo: undefined;
  Settings: undefined;
  SocialTab: undefined,
  Editprofile:undefined,
  BlockedAccounts:undefined,
  Create: {
    type: string
  },
  StaticManagement:{
    type:string
  },
  Deactivateaccount:undefined
};
const Stack = createNativeStackNavigator<AppStackParamList>();
const Router = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="SocialTab"
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Filluserinfo" component={Filluserinfo} />
        <Stack.Screen name="SocialTab" component={MyTabs} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Create" component={Create}/>
        <Stack.Screen name="Editprofile" component={EditProfile}/>
        <Stack.Screen name="StaticManagement" component={StaticManagement}/>
        <Stack.Screen name="BlockedAccounts" component={BlockedAccountsScreen}/>
        <Stack.Screen name="Deactivateaccount" component={Deactivateaccount}/>






      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router