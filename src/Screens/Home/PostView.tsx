import { View, StyleSheet,ViewToken } from 'react-native'
import React from 'react'
import { Colors } from '../../Theme'
import PostHeader from '../../Component/PostCoomponent/PostHeader'
import PostMedia from '../../Component/PostCoomponent/PostMedia'
import PostFooter from '../../Component/PostCoomponent/PostFooter'
import { UserPost } from '../../Redux/Sliceinterface'

 interface postViewprops{
  item:UserPost,
  MenuPress?:(selected_index:number)=>void,
  index:number,
  hidemenu_btn:boolean|false,

}
const PostView = ({item,MenuPress,index,hidemenu_btn}:postViewprops) => {
  const [activeindex, setactiveindex] = React.useState<number>(0)
 
  return (
    <View
    style={[styles.main,]}
    
    >
      <PostHeader
      MenuPress={MenuPress}
      username={item.user.username}
      profileImage={item.user.profileurl}
      time={item.created_at}
      user_id={item.user.id}
      index={index}
      hidemenu_btn={hidemenu_btn}
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