import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import LinerGradiantView from '../../Component/LinerGradiantView'
import MyHeader from '../../Component/MyHeader'
import { normalize } from '../../../Normalize'

const Create = () => {
  return (
    <LinerGradiantView>
      <MyHeader
      title={"Create a new Feed"}
      leftPress={()=>{

      }}
      style={styles.header}
      color='#000'
      titlestyle={styles.headeTitlestyle}
      />
    </LinerGradiantView>
  )
}

export default Create

const styles = StyleSheet.create({
  header:{
    backgroundColor:"#fff",
    marginTop:0,
    padding:10
  },
  headeTitlestyle:{
    color:"#000"
  }
})