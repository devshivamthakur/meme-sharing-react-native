import { View, Image, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, images } from '../../Theme'
import { deleteAsyncStorage, getAsyncStorage, saveToAsyncStorage } from '../../Utils'
import { IS_LOGIN, USERINFO } from '../../Asynckey'
import { useAppDispatch } from '../../Redux/Hooks'
import { updateUserinfo, updateloginstatus, updateusertoken } from '../../Redux/Reducers/UserinfoSlice'
import { getuserinfothunk } from '../../Redux/Actions/Userinfoactions'
import { ErrorMessage } from '../../Component/ErrorMessage'

const Splash = (props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {

    let timer = setTimeout(() => {

      getAuthStatus()
    }, 3000)

    return () => {
      clearTimeout(timer)

    }
  }, [])

  const getAuthStatus = () => {
    getAsyncStorage(IS_LOGIN).then((value) => {
      if (value) {
        getAsyncStorage(USERINFO).then((value) => {
          dispatch(updateusertoken(JSON.parse(value).token ))

          dispatch(getuserinfothunk()).unwrap()
            .then((response) => {

              dispatch(updateloginstatus(true))
              saveToAsyncStorage(IS_LOGIN, "true")
              dispatch(updateUserinfo(response))
              let profileinfo={

                data:response,
                token:JSON.parse(value).token

              }
              saveToAsyncStorage(USERINFO, JSON.stringify(profileinfo))
              props.navigation.replace("SocialTab")
            }).catch((err) => {
              console.log(err)
              ErrorMessage(err.response)
            })
        })


      } else {

        props.navigation.replace('Auth')
      }

    }).catch((err) => {
      props.navigation.replace('Auth')

    })

  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainbg,

      }}
    >
      <Image
        source={images.applogo}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',

        }}
      />
      <Text
        style={{
          fontSize: 30,
          color: Colors.white,
          fontFamily: 'Poppins-Bold',
          fontWeight: '600',
        }}
      >
        App Name
      </Text>
    </View>
  )
}

export default Splash