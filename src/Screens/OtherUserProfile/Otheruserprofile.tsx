import { View,StyleSheet} from 'react-native'
import React,{useEffect} from 'react'
import ProfileView from '../../Component/ProfileView'
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Router';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { IMAGEURL } from '../../Apiendpoints';
import { getOtherUserinfoAsync } from '../../Redux/Actions/Userinfoactions';
type CreateScreenRouteProp = RouteProp<AppStackParamList, 'OtherUserProfile'>;
interface OtherUserProfile_props{
  route:CreateScreenRouteProp
}

const Otheruserprofile = ({route}:OtherUserProfile_props) => {
  const dispatch = useAppDispatch()
  const userinfo = useAppSelector(state => state.userinfo.otherUserinfo)

  useEffect(() => {
    dispatch(getOtherUserinfoAsync(route.params.user_id))

    return () => {

    }
  }, [])
  return (
    <View
    style={styles.main}
    >
      <ProfileView
      user_id={route.params.user_id}
      name={userinfo.name}
      profileurl={IMAGEURL+userinfo.profileurl}
      total_like={userinfo.total_likes}
      total_posts={userinfo.total_post}

      />
      
      
    </View>
  )
}

export default Otheruserprofile

const styles=StyleSheet.create({
main:{
  flex:1,

}
})