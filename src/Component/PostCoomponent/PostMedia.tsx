import React,{memo} from 'react'
import { Text,StyleSheet,View,Dimensions} from 'react-native'
import { normalize } from '../../../Normalize'
import { Fonts } from '../../Theme'
import { Media } from '../../Redux/Sliceinterface'
import PostImage from './PostImage'
const {width, height} =Dimensions.get("window")
interface PostPhotoprops{
  mediaType:string,
  media:Media[],
  discription?:string,
  onChangeActiveindex:(index:number)=>void

  
}

const PostMedia = ({mediaType,media,discription,onChangeActiveindex}:PostPhotoprops) => {
  const RenderText:React.FC=()=>{
    return(
      <Text
      style={styles.text}
      >{discription}
      </Text>
    )

  }


  return (
    <View
    style={styles.container}
    >
      {
        mediaType==="TEXT"&&<RenderText/>
      }
      {
        mediaType==="IMAGE"&&<PostImage 
        
        media={media}
        onChangeActiveindex={onChangeActiveindex}
        />
      }
      
    
     
    
     
    </View>
  )
}

export default memo(PostMedia)
const styles=StyleSheet.create({
  container:{
    maxHeight:height*0.50,
    minHeight:height*0.20,
    justifyContent:"center",
    marginTop:"4%",
    backgroundColor:"white",
    // elevation:5,
    borderRadius:25,
    overflow:"hidden"
    
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