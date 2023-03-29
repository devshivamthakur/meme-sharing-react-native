import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import LinerGradiantView from '../../Component/LinerGradiantView'
import { FlashList } from '@shopify/flash-list'
import { styles } from './HomeStyle'
import VectorIcons from "../../Component/VectorIcons";
import MemoHoc from '../../Component/MemoHoc'
import PostView from './PostView'
import { Colors } from '../../Theme'
const { width, height } = Dimensions.get("window")
const estimatedItemSize = height
let data = [
  {
    id:1,
    mediaType:"TEXT",
    mediaurl:null,
    discription:"this is a text field of lenght of size",
  },{
    id:2,
    mediaType:"IMAGE",
    mediaurl:"https://miro.medium.com/v2/resize:fit:828/format:webp/1*JJmzyegMLyuB2iiYbzegBg.jpeg",
    discription:null,
  },{
    id:3,
    mediaType:"VIDEO",
    mediaurl:"",
    discription:"this is a video field of lenght of size",
  }
]
const Home = () => {
  const Header_ = () => {
    return (
      <View
      style={[styles.row,styles.header]}
      >
        <Text
        style={[styles.h1]}
        >Memes</Text>
        <View
        style={[styles.roundView]}
        >
          <VectorIcons
          family="AntDesign"
          name="setting"
          size={25}
          color={Colors.lowblack}
          
          
          />

        </View>
      </View>
    )

  }
  return (
    <LinerGradiantView>
      <FlashList
        data={data}
        estimatedItemSize={estimatedItemSize}
        ListHeaderComponent={Header_()}
        renderItem={({ item }) => (
          <MemoHoc>
            <PostView
            item={item}
            />
          </MemoHoc>
        )}
      />


    </LinerGradiantView>

  )
}

export default Home