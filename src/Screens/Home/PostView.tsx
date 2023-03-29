import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../Theme'
import PostHeader from '../../Component/PostCoomponent/PostHeader'
import PostMedia from '../../Component/PostCoomponent/PostMedia'
import PostFooter from '../../Component/PostCoomponent/PostFooter'
interface postViewprops{
  item:any
}
const PostView = ({item}:postViewprops) => {
  return (
    <View
    style={styles.main}
    
    >
      <PostHeader

      />
      <PostMedia
      mediaType={item.mediaType}
      mediaurl={item.mediaurl}
      discription={item.discription}

      
      />
      <PostFooter
      />

    </View>
  )
}

export default PostView

const styles=StyleSheet.create({
  main:{
    flex:1,
    width:"97%",
    alignSelf:"center",
    backgroundColor:Colors.white,
    borderRadius:25,
    padding:10,
    margin:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation:5
  }

})