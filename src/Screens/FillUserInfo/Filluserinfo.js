import {BackHandler, View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import React ,{useEffect} from 'react'
import { Colors, Fonts, images } from '../../Theme'
import MyHeader from '../../Component/MyHeader'
import withPreventDoubleClick from '../../Component/withPreventDoubleClick'
const TouchableOpacityex = withPreventDoubleClick(TouchableOpacity)
import { EMAIL_REGEX, NAME_REGEX, USERNAME_REGEX } from '../../Utils'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { pickImageVideo, takeImageVideo, takePermission } from '../../Component/Helper'
import ChooseInterest from './ChooseInterest'
import CustomButton from '../../Component/CustomButton'
import { useFocusEffect } from '@react-navigation/native'
const Filluserinfo = (props) => {
  const [step, setStep] = React.useState(1)
  const [email, setEmail] = React.useState('')
  const [emailerror, setEmailerror] = React.useState(null)
  const [name, setName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [nameError, setNameError] = React.useState(null)
  const [usernameError, setUsernameError] = React.useState(null)
  const [ProfilePicUrl, setProfilePicUrl] = React.useState(null)
  const [selectedInterest, setSelectedInterest] = React.useState({})
  const validateEmail = (email) => {
    let error = null
    if (!email) {
      error = "Email can't be blank"

    }
    if (email && !EMAIL_REGEX.test(email)) {
      console.log("email", email)
      error = "Email is invalid"
    }
    setEmailerror(error)
    return error == null;


  }
  const validate_name = (name) => {
    let error = null
    if (!name) {
      error = "Name can't be blank"
    }
    if (name && name.length < 3) {
      error = "Name is too short"
    }
    if (name && !NAME_REGEX.test(name)) {
      error = "Name is invalid"
    }
    setNameError(error)
    return error == null;
  }

  const validate_username = (username) => {
    let error = null
    if (!username) {
      error = "Username can't be blank"
    }
    if (username && username.length < 3) {
      error = "Username is too short"
    }
    if (username && !USERNAME_REGEX.test(username)) {
      error = "Username is invalid"
    }
    console.log("username", username, "error", error)
    setUsernameError(error)
    return error == null;

  }
  const EmailInput = () => {
    return (
      <View
        style={styles.box}
      >
        <Text
          style={[styles.heading, {
            width: "70%",
            marginTop: "10%",
            // alignSelf:"center"
          }]}
        >
          What is your email address?
        </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder="Email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text)
            validateEmail(text)
          }}


        />
        {
          emailerror && <Text
            style={styles.error}
          >
            {emailerror}
          </Text>
        }

      </View>
    )

  }

  const PickImage = async () => {
    Alert.alert("Select Image", "Choose from where you want to select image", [
      {
        text: "Camera",
        onPress: () => {
          takePermission().then((res) => {
            if (res) {
              takeImageVideo("image").then((res) => {
                console.log("res", res.path)
                setProfilePicUrl(res.path)

              })
            }

          }).catch((err) => {
            console.log("err", err)
          }
          )
        }
      }, {
        text: "Gallery",
        onPress: () => {
          takePermission().then((res) => {
            if (res) {
              pickImageVideo("image").then((res) => {
                console.log("res", res.path)
                setProfilePicUrl(res.path)

              })
            }

          }).catch((err) => {
            console.log("err", err)
          }
          )
        }
      }
    ])

  }

  const Name_userName = () => {
    return (
      <View
        style={styles.box}
      >
        <Text
          style={[styles.heading, {
            width: "70%",
            marginTop: "10%",
            // alignSelf:"center"
          }]}
        >
          What is your name?
        </Text>
        <TextInput
          style={[styles.input, {
            marginTop: "2%"
          }]}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => {
            setName(text)
            validate_name(text)
          }}
        />
        {
          nameError && <Text
            style={styles.error}
          >
            {nameError}
          </Text>
        }
        <Text
          style={[styles.heading, {
            width: "70%",
            marginTop: "10%",
            // alignSelf:"center"
          }]}
        >
          Set a user name
        </Text>
        <TextInput
          style={[styles.input, {
            marginTop: "2%"
          }]}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder="Enter username"
          value={username}
          onChangeText={(text) => {
            setUsername(text)
            validate_username(text)


          }}
        />
        {
          usernameError && <Text
            style={styles.error}
          >
            {usernameError}
          </Text>
        }
      </View>
    )


  }
  const ProfilePic = () => {
    return (
      <View
        style={styles.box}
      >
        <Text
          style={[styles.heading, {
            width: "70%",
            marginTop: "10%",
            // alignSelf:"center"
          }]}
        >
          Upload your profile picture
        </Text>
        <View
          style={{
            marginTop: "10%",
            alignSelf: "center",
            // borderWidth:


          }}
        >
          <Image
            source={ProfilePicUrl ? { uri: ProfilePicUrl } : { uri: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" }}
            style={styles.profileimge}
          />
          <TouchableOpacity
            style={styles.cameraicon}
            onPress={() => {
              PickImage()
            }}
          >



            <MaterialCommunityIcons
              name="camera"
              size={30}
              color={Colors.white}
              style={styles.camera}

            />
          </TouchableOpacity>
        </View>

      </View>
    )

  }
  const input_type = {
    1: EmailInput,
    2: Name_userName,
    3: ChooseInterest,
    4: ProfilePic,
  }
  const next = () => {
    if (step == 1) {
      if (!validateEmail(email)) {
        return
      }
    }
    if (step == 2) {
      let flag = true
      if (!validate_name(name)) {
        flag = false

      }
      if (!validate_username(username)) {
        console.log("name", name, "username", username, "flag", flag, !validate_username(username))
        flag = false
      }
      if (!flag) {
        return
      }


    }
    if (step == 3 && Object.keys(selectedInterest).length < 3) {
      alert("Please select at least 3 interest")
      return
    }
    if (step == 4) {
      if (!ProfilePicUrl) {
        return
      }

    }
    if(step!=4){

      setStep(step + 1)
    }else{
      //save into api
      
    }


  }
  const getSelected = (selectedInterest) => {
    setSelectedInterest(selectedInterest)
  }
  const onBack=()=>{
    setStep(step - 1)
  }
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (step==1) {
          
          return true;
        } else {
          onBack()
          return false;
        }
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [step])
  );
  
  return (
    <SafeAreaView
      style={styles.container}>
      <MyHeader
        title={`Step ${step}/4`}
        hideLeft={step==1}
        leftPress={onBack}
      />

      {
        step != 3 ? input_type[step]() : <ChooseInterest
          getSelected={getSelected}
          heading={styles.heading}
        />
      }

      {
        step != 4 && <CustomButton
          iconname='arrowright'
          iconfamily="AntDesign"
          iconcolor={Colors.white}
          onPress={next}
          iconSize={30}
          buttonStyle={styles.btn}

        />
      }

{
        step == 4 && <CustomButton
         
          onPress={next}
          buttonStyle={styles.btn2}
          title="Submit"
          textStyle={styles.btntxt}
        />
      }
      
    </SafeAreaView>
  )
}

export default Filluserinfo

const styles = StyleSheet.create({
  btntxt: {
    color: Colors.white,
    fontFamily: Fonts.normal,
    fontSize: 15,
    fontWeight: "500",


  },
  btn2: {
    width: "40%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "#488795",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%"



  },
  cameraicon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignSelf: "center",
    position: "absolute",
    bottom: -20,
    right: -5,


  },
  profileimge: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: Colors.white,

  },
  error: {
    color: Colors.red,
    fontFamily: Fonts.normal,
    fontSize: 12,
    marginTop: 5

  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#488795",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%"

  },
  box: {
    padding: "5%"

  },
  container: {
    flex: 1,
    backgroundColor: Colors.mainbg,
  },
  heading: {
    fontSize: 25,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
  input: {
    width: "90%",
    padding: 10,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    fontSize: 15,
    color: Colors.white,
    paddingLeft: 0,
    marginTop: "10%",
    fontFamily: Fonts.normal,

  }
})