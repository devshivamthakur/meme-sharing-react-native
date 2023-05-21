import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useMemo, memo, useEffect } from 'react'
import VectorIcon from '../VectorIcons'
import withPreventDoubleClick from '../withPreventDoubleClick'
import { Colors, Fonts } from '../../Theme'
import { normalize } from '../../../Normalize'
import { formatNumber } from '../../Utils'
import RenderBullets from './RenderBullets'
import { useAppDispatch } from '../../Redux/Hooks'
import { LikeDislike_API } from '../../Apiendpoints'
import { LikeDislikeasync } from '../../Redux/Actions/Postinfoactions'
const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)
interface PostFooterprops {
  activeindex: number,
  totalLikes: number,
  is_liked: number | null,
  mediaLength: number,
  post_id: number,
  index: number,
}
const PostFooter = (props: PostFooterprops) => {
  const [isLiked, setisLiked] = useState(false)
  const [isdisliked, setisdisliked] = useState(false)
  const [total_likes, setTotalLikes] = useState(0)
  const dispatch = useAppDispatch()
  useEffect(()=>{
    setisLiked(props.is_liked == 1)
    setisdisliked(props.is_liked == 0)
    setTotalLikes(props.totalLikes | 0)

  },[props])
  const UpdateLikeDislike = useCallback(
    (status: boolean) => {

      if (status) {

        if (!isLiked) {
          setisLiked(true)
          setTotalLikes(prev => prev + 1)
          setisdisliked(false)
          dispatch(LikeDislikeasync({
            status: true,
            postid: props.post_id,
          }))

        }

      } else {

        if (!isdisliked) {
          setisdisliked(true)
          setisLiked(false)
          if (total_likes > 0) {
            setTotalLikes(prev => prev - 1)
          }
          dispatch(LikeDislikeasync({
            status: false,
            postid: props.post_id,

          }))

        }
      }


    },
    [isLiked, isdisliked, total_likes],
  )
  const TotalLikes = useMemo(() => {
    return formatNumber(total_likes)

  }, [total_likes])

  return (
    <>
      {props.mediaLength > 1 && <RenderBullets
        size={props.mediaLength}
        activeindex={props.activeindex}
      />}
      <View
        style={styles.container}
      >

        <View
          style={styles.row1}
        >
          <TouchableOpacityEx
            onPress={() => {
              UpdateLikeDislike(true)

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
              UpdateLikeDislike(false)

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
              left: "45%"

            }
          }
        >
          <Text
            style={styles.likecount}
          >{TotalLikes}</Text>
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
    </>
  )
}

export default memo(PostFooter)

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
    marginTop: "5%",
    marginBottom: "5%",



  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
})