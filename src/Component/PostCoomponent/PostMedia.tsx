import React from 'react'
import FastImage from "react-native-fast-image"
import { Text,StyleSheet,View,Dimensions} from 'react-native'
import { normalize } from '../../../Normalize'
import { Fonts } from '../../Theme'
const {width, height} =Dimensions.get("window")
interface PostPhotoprops{
  mediaType:"IMAGE"|"TEXT"|"VIDEO",
  mediaurl?:string,
  discription?:string,
  
}

const PostMedia = ({mediaType,mediaurl,discription}:PostPhotoprops) => {
  const RenderText=()=>{
    return(
      <Text
      style={styles.text}
      >{discription}
      </Text>
    )

  }
  const RenderImage=()=>{
    return(
      <FastImage
        style={styles.image}
        source={{uri:mediaurl}}
      />
    )
  }
  const RenderVideo=()=>{
    return(null)
  }
  let RenderMedia={
    IMAGE:RenderImage,
    TEXT:RenderText,
    VIDEO:RenderVideo,
  }
  return (
    <View
    style={styles.container}
    >
    {
      RenderMedia[mediaType]()
    }
     
    </View>
  )
}

export default PostMedia
const styles=StyleSheet.create({
  container:{
    height:height*0.50,
    justifyContent:"center",
    marginTop:"4%",
    backgroundColor:"white",
    elevation:5,
    borderRadius:25,
    
  },
  image:{
    height:height*0.50,
    borderRadius:25,
    resizeMode:"cover"
  },
  text:{
    fontSize:normalize(15),
    color:"#000000",
    textAlign:"center",
    width:"95%",
    alignSelf:"center",
    fontFamily:Fonts.normal

  }

})