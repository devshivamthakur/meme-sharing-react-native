import Home from './Screens/Home/Home';
import React from 'react';
import VectorIcon from "./Component/VectorIcons"
import { Image, View } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { images } from './Theme';
import Myprofile from './Screens/MyProfile/Myprofile';
import CreateOptions from './Screens/CreateOptions/CreateOptions';
export type BottomTabParamslist = {
  Home: undefined;
  Createoptions: undefined;
  Myprofile: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParamslist>();
export function MyTabs() {

  const CreateIcon = () => {
    return (
      <View
        style={{
          height: 68,
          width: 68,
          borderRadius: 68 / 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "#fd809e",
          zIndex: 1,
          overflow: "visible",
          top: -10

        }}
      >
        <View
        style={{
          backgroundColor:"#621bee",
          width:68,
          height:68,
          borderRadius:68/2,
          justifyContent:"center",
          alignItems:"center",
          position:"absolute",
          top:-5
          
        }}
        >
          <VectorIcon
          family='Entypo'
          name='plus'
          size={35}
          color='white'
          
          />

        </View>

      </View>

    )
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 72,
          borderTopRightRadius:25,
          borderTopLeftRadius:25,
        },
        tabBarActiveTintColor: "#242048",
        tabBarInactiveTintColor: "#3e2465",
        tabBarShowLabel: false,
        headerShown:false

      }}
      initialRouteName="Createoptions"



    >
      <Tab.Screen name="Home" component={Home}

        options={{



          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, }) => (
            !focused?<VectorIcon
              family={!focused ? "FontAwesome5" : "Fontisto"}
              name={!focused ? "smile" : "smiley"}
              size={25}
              color={color}

            />:<Image
            source={images.emoji}
            style={{
              width:25,
              height:25,
              tintColor:"#242048",
              resizeMode:"contain"

            }}
            />
            

          ),


        }}

      />
      <Tab.Screen name="Createoptions" component={CreateOptions}

        options={{


          tabBarLabel: 'Home',
          tabBarIcon: ({ }) => (
            CreateIcon()
          ),


        }}
      />
      <Tab.Screen name="Myprofile" component={Myprofile}
        options={{


          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color }) => (
            <VectorIcon
              family={"FontAwesome"}
              name={focused?"user":"user-o"}
              size={25}
              color={color}

            />

          ),


        }}
      />
    </Tab.Navigator>
  );
}