import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './Screens/Splash/Splash';
import Auth from './Screens/Auth/Auth';
import Filluserinfo from './Screens/FillUserInfo/Filluserinfo';
import { MyTabs } from './Tabs';
import Settings from './Screens/Settings/Settings';
import Create from './Screens/Create/Create';
import { EditProfile } from './Screens/Editprofile/Editprofile';
import StaticManagement from './Screens/StaticManagement/StaticManagement';
import BlockedAccountsScreen from './Screens/BlockedAccounts/BlockedAccountsScreen';
import Deactivateaccount from './Screens/DeactivateAccount/Deactivateaccount';
import Otheruserprofile from './Screens/OtherUserProfile/Otheruserprofile';
import MyTest from '../MyTest';
import { useAppSelector } from './Redux/Hooks';
import Modalloader from './Component/Modalloader';
import PostDetails from './Screens/PostDetails/PostDetails';
import { UserPost } from './Redux/Sliceinterface';
export type AppStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Filluserinfo: undefined;
  Settings: undefined;
  SocialTab: undefined,
  Editprofile:undefined,
  BlockedAccounts:undefined,
  Create: {
    type: string;
  },
  StaticManagement:{
    type:string
  },
  Deactivateaccount:undefined,
  MyTest:undefined,
  OtherUserProfile:{
    user_id:number
  },
  PostDetails:UserPost
};
const Stack = createNativeStackNavigator<AppStackParamList>();
const Router = () => {
const isLogin=useAppSelector(state=>state.userinfo.islogin)
  const AuthScreen=()=>{
    return(
      <>
      <Stack.Screen name="SocialTab" component={MyTabs} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Create" component={Create}/>
      <Stack.Screen name="Editprofile" component={EditProfile}/>
      <Stack.Screen name="StaticManagement" component={StaticManagement}/>
      <Stack.Screen name="BlockedAccounts" component={BlockedAccountsScreen}/>
      <Stack.Screen name="Deactivateaccount" component={Deactivateaccount}/>
      <Stack.Screen name="OtherUserProfile" component={Otheruserprofile}/>

      </>
    )
  }
  return (
    <NavigationContainer>
      <Modalloader/>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Filluserinfo" component={Filluserinfo} />
       
        <Stack.Screen name="MyTest" component={MyTest}/>
        <Stack.Screen name="PostDetails" component={PostDetails}/>


        {
          isLogin&&AuthScreen()
        }





      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router