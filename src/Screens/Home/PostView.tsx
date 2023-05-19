import { View, StyleSheet,ViewToken } from 'react-native'
import React from 'react'
import { Colors } from '../../Theme'
import PostHeader from '../../Component/PostCoomponent/PostHeader'
import PostMedia from '../../Component/PostCoomponent/PostMedia'
import PostFooter from '../../Component/PostCoomponent/PostFooter'
import { UserPost } from '../../Redux/Sliceinterface'
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
interface postViewprops{
  item:UserPost,
  MenuPress:(selected_index:number)=>void,
  index:number,

}
const PostView = ({item,MenuPress,index}:postViewprops) => {
  const [activeindex, setactiveindex] = React.useState<number>(0)
 
  return (
    <Animated.View
    style={[styles.main,]}
    
    >
      <PostHeader
      MenuPress={MenuPress}
      username={item.user.username}
      profileImage={item.user.profileurl}
      time={item.created_at}
      user_id={item.user.id}
      index={index}
      />
      
      { <PostMedia
      mediaType={item.post_type.toUpperCase()}
      media={item.media}
      discription={item.description}
      onChangeActiveindex={(index:number)=>{
        setactiveindex(index)
      }}
      
      />}
      <PostFooter
      activeindex={activeindex}
      totalLikes={item.total_likes}
      is_liked={item.is_liked}
      mediaLength={item.media.length}
      post_id={item.id}
      index={index}
      />

    </Animated.View>
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