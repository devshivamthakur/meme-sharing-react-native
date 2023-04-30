import { Image, Animated, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors, Fonts, images } from '../../Theme'
import withPreventDoubleClick from '../../Component/withPreventDoubleClick'
import { normalize } from '../../../Normalize'
const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { showMessage } from 'react-native-flash-message'
import {  saveToAsyncStorage } from '../../Utils'
import { IS_LOGIN, USERINFO } from '../../Asynckey'
import axios from 'axios'
import { LOGINAPI } from '../../Apiendpoints'
import { ErrorMessage } from '../../Component/ErrorMessage'
import { useAppDispatch } from '../../Redux/Hooks'
import { updateUserinfo, updateloginstatus, updateusertoken } from '../../Redux/Reducers/UserinfoSlice'
const Auth = (props) => {
  const [fadeAnim] = React.useState(new Animated.Value(0))
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }
    ).start();
  }, [])

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '29910542249-4ht7j6d7c64jp1p6cbe5r80m3252jg2v.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);
  const GoogleLogin = async () => {

    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setLoading(false);
      LoginApi(userInfo)

      // props.navigation.navigate("Filluserinfo")

    } catch (error) {
      setLoading(false);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {

        showMessage({
          message: "User cancelled login.",
          type: "danger",
          icon: "danger",
        })
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showMessage({
          message: "Signing in...",
          type: "danger",
          icon: "danger",
        })
        // operation in progress already

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showMessage({
          message: "Play services not available.",
          type: "danger",
          icon: "danger",
        })
        // play services not available or outdated
      } else {
        showMessage({
          message: "Something went wrong",
          type: "danger",
          icon: "danger",
        })
        // some other error happened
      }
    }
  };

  const LoginApi = (googlesignininfo) => {
    setLoading(true)

    axios(
      {
        url: LOGINAPI,
        method: "post",
        data: {
          email: googlesignininfo.user.email,
          google_id: googlesignininfo.user.id

        }

      }
    ).then((response) => {
      setLoading(false)
      if (response.status == 200) {
        showMessage({
          message: "Login successfully",
          type: "success",
          icon: "success",
          duration: 3000
        })

        if (response.data.data.name == '') {
          props.navigation.replace("Filluserinfo",{
            userinfo: response.data.data,
            token: response.data.token
          })
        } else {
          dispatch(updateloginstatus(true))
          saveToAsyncStorage(IS_LOGIN, "true")
          dispatch(updateUserinfo(response.data.data))
          dispatch(updateusertoken(response.data.token))
          saveToAsyncStorage(USERINFO, JSON.stringify(response.data))
          props.navigation.replace("SocialTab")

        }


      }

    }).catch((error) => {
      console.log(error)

      setLoading(false)

      ErrorMessage(error)

    })
  }
  return (
    <SafeAreaView
      style={styles.main}
    >
      <Animated.Image
        source={images.applogo}
        style={[styles.logo, {
          opacity: fadeAnim
        }]}

      />
      <Animated.Text
        style={[styles.h1, {
          marginTop: "10%",
          opacity: fadeAnim
        }]}
        adjustsFontSizeToFit={true}

      >Welcome to the </Animated.Text>
      <Text
        style={styles.h1}
        adjustsFontSizeToFit={true}
      >
        My App
      </Text>
      <TouchableOpacityEx
        style={[styles.rowbtn, {
          marginTop: "25%"
        }]}
        onPress={() => {
          props.navigation.navigate("Filluserinfo")
        }}
      >
        <Image
          source={images.metamask}
          style={styles.icon}
        />
        <Text
          style={styles.btntext}
          adjustsFontSizeToFit={true}
        >
          Connect with Metamask
        </Text>

      </TouchableOpacityEx>
      <TouchableOpacityEx
        style={[styles.rowbtn, {
          marginTop: "5%"
        }]}
        onPress={() => {
          GoogleLogin()
        }}
      >
        <Image
          source={images.google}
          style={styles.icon}
        />



        {!loading ? <Text
          style={styles.btntext}
          adjustsFontSizeToFit={true}
        >
          Connect with Google
        </Text> : <ActivityIndicator
          color={"blue"}
          size={"large"}

        />}

      </TouchableOpacityEx>
    </SafeAreaView>
  )
}

export default Auth


const styles = StyleSheet.create({
  btntext: {
    fontSize: normalize(16),
    color: Colors.mainbg,
    fontFamily: Fonts.normal,
    fontWeight: "600",
    marginLeft: "5%"

  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",

  },
  rowbtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: "5%",
    width: "90%",
    alignSelf: "center",
    paddingLeft: "10%"
    // justifyContent:"center"


  },
  main: {
    flex: 1,
    backgroundColor: Colors.mainbg,
    padding: "5%"
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    alignSelf: "center"

  },
  h1: {
    fontSize: normalize(34),
    color: Colors.white,
    fontFamily: Fonts.normal,
    fontWeight: "700"
  }


})