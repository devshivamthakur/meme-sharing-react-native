import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import VectorIcon from '../VectorIcons'
import withPreventDoubleClick from '../withPreventDoubleClick'
import { Colors, Fonts } from '../../Theme'
import { normalize } from '../../../Normalize'
const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)
const PostFooter = () => {
  const [isLiked, setisLiked] = useState(false)
  const [isdisliked, setisdisliked] = useState(false)
  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.row1}
      >
        <TouchableOpacityEx
          onPress={() => {
            if (isLiked) {
              setisLiked(false)

            } else {
              setisLiked(true)
              setisdisliked(false)
            }
          }}
        >

          <VectorIcon
            family='AntDesign'
            name={isLiked ? 'like1' : 'like2'}
            size={25}
            color={isLiked ? Colors.primary : Colors.lowblack}
          />
        </TouchableOpacityEx>
        <TouchableOpacityEx
          onPress={() => {
            if (isdisliked) {
              setisdisliked(false)

            } else {
              setisdisliked(true)
              setisLiked(false)
            }
          }}
          style={{
            marginLeft: 19
          }}

        >

          <VectorIcon
            family='AntDesign'
            name={isdisliked ? 'dislike1' : 'dislike2'}
            size={25}
            color={isdisliked ? Colors.primary : Colors.lowblack}
          />
        </TouchableOpacityEx>
      </View>
      <View
        style={
          {
            position: "absolute",
            left: "43%"

          }
        }
      >
        <Text
          style={styles.likecount}
        >84124</Text>
        <Text
          style={styles.like}
        >Likes</Text>
      </View>
      <TouchableOpacityEx>
        <VectorIcon
          family='Feather'
          name='send'
          size={25}
          color={Colors.lowblack}
        />
      </TouchableOpacityEx>
    </View>
  )
}

export default PostFooter

const styles = StyleSheet.create({
  like: {

    color: "#33212b",
    fontSize: normalize(13),
    textAlign: "center"

  },
  likecount: {
    fontSize: normalize(15),
    color: "#33212b",
    fontFamily: Fonts.normal,
    textAlign: "center",
    fontWeight: "700",

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "94%",
    alignSelf: "center",
    marginTop:"5%",
    marginBottom:"5%",
    


  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
})