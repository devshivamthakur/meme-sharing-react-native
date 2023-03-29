import { View, Text ,FlatList,StyleSheet} from 'react-native'
import React from 'react'
import LinerGradiantView from '../../Component/LinerGradiantView'
import ProfileHeader from '../../Component/Profile/ProfileHeader'

const Myprofile = () => {
  return (
    <LinerGradiantView
    >
      <FlatList
      data={[]}
      renderItem={({item,index})=>{
        return null;

      }}
      ListHeaderComponent={<ProfileHeader/>}
      />
      
    </LinerGradiantView>
  )
}

export default Myprofile

const styles=StyleSheet.create({
main:{
  flex:1,

}
})