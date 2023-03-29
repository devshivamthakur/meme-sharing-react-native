import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './Screens/Splash/Splash';
import Auth from './Screens/Auth/Auth';
import Filluserinfo from './Screens/FillUserInfo/Filluserinfo';
import Home from './Screens/Home/Home';
import { MyTabs } from './Tabs';

const Stack=createNativeStackNavigator()
const Router = () => {
  const Tab=()=>{

  }
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            headerShown:false
        }}
        initialRouteName="SocialTab"
        >
            <Stack.Screen name="Splash" component={Splash}/>
            <Stack.Screen name="Auth" component={Auth}/>
            <Stack.Screen name="Filluserinfo" component={Filluserinfo}/>
            <Stack.Screen name="SocialTab" component={MyTabs}/>


        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router