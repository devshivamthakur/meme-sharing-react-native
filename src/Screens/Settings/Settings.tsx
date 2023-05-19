import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import LinerGradiantView from '../../Component/LinerGradiantView'
import MyHeader from '../../Component/MyHeader'
import { normalize } from '../../../Normalize'
import { Colors, Fonts, images } from '../../Theme'
import SettingsMenu from '../../Component/Settings/SettingsMenu'
import UserNavigationProp from "../../Component/UserNavigationProp"
import { MyCustomAlert } from '../../Component/MyCustomAlert'
import { APPNAME } from '../../Contants'
import { deleteAsyncStorage } from '../../Utils'
import { IS_LOGIN, USERINFO } from '../../Asynckey'
import { useAppSelector } from '../../Redux/Hooks'
import { IMAGEURL } from '../../Apiendpoints'
import FastImage from 'react-native-fast-image'
import {
  GoogleSignin,
} from "@react-native-google-signin/google-signin";
interface Settingsprops {
  navigation: UserNavigationProp<"Settings">
}
const Settings = (props: Settingsprops) => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [alertImage, setAlertImage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [noVisible, setNoVisible] = useState(false);
  const [noBtnText, setNoBtnText] = useState("");
  const [isFrom, setIsFrom] = useState("");
  const userinfo = useAppSelector(state => state.userinfo.userinfo)
  const renderProfileInfoView = () => {
    return (
      <View
        style={[styles.profieinfocontainer, {
          flexDirection: "row",

        }]}
      >
        <FastImage
          style={styles.profileimg}
          source={{ uri: IMAGEURL + userinfo.profileurl }}
        />

        <View
          style={styles.profileinfo}
        >
          <Text
            numberOfLines={1}
            style={styles.name}
          >
            {userinfo.name}
          </Text>

          <Text
            style={styles.emailsstyle}
          >
            {userinfo.email}
          </Text>
        </View>
      </View>
    );
  };
  const onAlertClick = (param: string) => {
    setIsVisible(false)
    if (isFrom == "logout" && param == "yes") {
      try {
        GoogleSignin.isSignedIn().then((value) => {
          if (value) {

            GoogleSignin.signOut()
          }
        })

      } catch (error) {

      }
      deleteAsyncStorage(IS_LOGIN)
      deleteAsyncStorage(USERINFO)

      props.navigation.replace("Auth")
    }
  }

  const onPressSettingsMenu = (index: number) => {
    switch (index) {
      case 0:
        props.navigation.navigate("Editprofile");
        break;
      case 1:
        props.navigation.navigate("StaticManagement", {
          type: "About us"
        })
        break;
      case 2:
        props.navigation.navigate("StaticManagement", {
          type: "Terms and Conditions"
        })
        break;
      case 3:
        props.navigation.navigate("StaticManagement", {
          type: "Privacy Policy"
        })
        break;
      case 4:
        props.navigation.navigate("BlockedAccounts")
        break;
      case 5:
        props.navigation.navigate("Deactivateaccount")
        break;
      case 6:
        setIsVisible(true)
        setNoVisible(true)
        setError("Do you want to Logout?")
        setErrorTitle(APPNAME)
        setButtonText("Yes")
        setNoBtnText("Cancel")
        setIsFrom("logout")
        break
    }
  }
  return (
    <LinerGradiantView>
      <MyHeader
        title={'Settings'}
        titlestyle={styles.titlestyle}
        leftPress={() => {
          props.navigation.goBack()

        }}
      />
      {
        renderProfileInfoView()
      }
      <SettingsMenu
        profieinfocontainer={styles.profieinfocontainer}
        onPressSettingsMenu={onPressSettingsMenu}
      />

      {isVisible == true && (
        <MyCustomAlert
          alertImage={alertImage}
          alertVisible={isVisible}
          noVisible={noVisible}
          onRequestClose={(param) => onAlertClick(param)}
          error={error}
          errorTitle={errorTitle}
          buttonText={buttonText}
          noBtnText={noBtnText}
        />
      )}
    </LinerGradiantView>
  )
}

export default Settings
const styles = StyleSheet.create({
  titlestyle: {
    fontSize: normalize(18),
    fontWeight: "600"
  },
  profieinfocontainer: {
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    width: "95%",
    alignSelf: "center",
    padding: 10,
    paddingTop: 18,
    paddingBottom: 16,
    borderRadius: 8,
    alignItems: "center",
    // height: 70,
  },
  profileimg: {
    height: 44,
    width: 44,

    resizeMode: "cover",
    borderRadius: 44 / 2,
  },
  profileinfo: {
    marginLeft: 14,
    height: 50,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  name: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    color: Colors.black,
    flex: 1,
  },
  emailsstyle: {
    fontFamily: Fonts.normal,
    fontSize: 12,
    color: Colors.lowblack,
  }
})