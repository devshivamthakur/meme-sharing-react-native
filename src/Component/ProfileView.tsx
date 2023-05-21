import { View, Text, FlatList,RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import LinerGradiantView from './LinerGradiantView'
import MemoHoc from './MemoHoc'
import RenderPost from './RenderPost'
import ProfileHeader, { ProfileHeaderProps } from './Profile/ProfileHeader'
import { useAppDispatch, useAppSelector } from '../Redux/Hooks'
import { getUserPost_thunk } from '../Redux/Actions/Userinfoactions'
import { useNavigation_ } from './UseNavigation'
interface Profileview_ extends ProfileHeaderProps {
  user_id: number
}
const ProfileView = (props: Profileview_) => {
  const dispatch=useAppDispatch()
  const navigation=useNavigation_("OtherUserProfile")
  const State=useAppSelector(state=>state.userinfo)
  const [refreshing,setrefreshing]=React.useState(false)
  useEffect(()=>{
    setTimeout(() => {
      dispatch(getUserPost_thunk(props.user_id))
    }, 1000);
  },[props])

  return (
    <LinerGradiantView
    >
      <FlatList
        data={State.userpost}
        numColumns={3}
        refreshControl={
          <RefreshControl

            refreshing={refreshing}
            onRefresh={() => {
              setrefreshing(true)
              dispatch(getUserPost_thunk(props.user_id))
              setTimeout(() => {
                
                setrefreshing(false)
              }, 2000);
            }}

          />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (item.post_type!="text"&& item.media.length==0){
            return null
          }
          return (
            <MemoHoc>
              <RenderPost
                item={item}
                index={index}
              />
            </MemoHoc>
          )

        }}

        contentContainerStyle={{
          // backgroundColor: "#fff",

        }}
        columnWrapperStyle={{
          backgroundColor: "#fff",

        }}
        ListHeaderComponent={<ProfileHeader
          {...props}
          onPressBackButton={()=>{
            navigation.goBack()
          }}



        />}

      />

    </LinerGradiantView>
  )
}

export default ProfileView