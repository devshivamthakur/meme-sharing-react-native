import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

import ProfileView from '../../Component/ProfileView'
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks'
import { useDispatch } from 'react-redux'
import { getuserinfothunk } from '../../Redux/Actions/Userinfoactions'
import { IMAGEURL } from '../../Apiendpoints'
import { resetOtheruserinfoand_Userpost } from '../../Redux/Reducers/UserinfoSlice'
import { useFocusEffect } from '@react-navigation/native'
const Myprofile = () => {

  const userinfo = useAppSelector(state => state.userinfo.userinfo)
  const dispatch = useAppDispatch()
  useFocusEffect(
    React.useCallback(() => {

      dispatch(resetOtheruserinfoand_Userpost())
      setTimeout(() => {

    dispatch(getuserinfothunk())
      }, 1000);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );


  return (
    <View
      style={styles.main}
    >
      <ProfileView
        user_id={userinfo.id}
        name={userinfo.name}
        profileurl={IMAGEURL+userinfo.profileurl}
        total_like={userinfo.total_likes}
        total_posts={userinfo.total_post}


      />


    </View>
  )
}

export default Myprofile

const styles = StyleSheet.create({
  main: {
    flex: 1,

  }
})