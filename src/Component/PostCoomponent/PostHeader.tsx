import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import FastImage from 'react-native-fast-image'
import { normalize } from '../../../Normalize'
import { Fonts } from '../../Theme'
import VectorIcon from '../VectorIcons'
import withPreventDoubleClick from '../withPreventDoubleClick'
import { useNavigation } from '@react-navigation/native'
import { useNavigation_, useNavigation_Tab } from '../UseNavigation'
import { IMAGEURL } from '../../Apiendpoints'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks'
import { resetOtheruserinfoand_Userpost } from '../../Redux/Reducers/UserinfoSlice'

const { width, height } = Dimensions.get("window")
const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity);
interface PostHeaderprops {
    MenuPress?: (selected_index: number) => void,
    profileImage?: string,
    username: string,
    time?: string,
    user_id: number,
    index: number,
    hidemenu_btn: boolean|false

}
const PostHeader = ({ MenuPress, profileImage, username, time, user_id, index, hidemenu_btn }: PostHeaderprops) => {
    const navigation = useNavigation_Tab("Myprofile")
    const navigation_2 = useNavigation_("SocialTab")
    const Userinfo = useAppSelector(state => state.userinfo.userinfo)
    const Dispatch = useAppDispatch()
    const onPressProfile = () => {
        Dispatch(resetOtheruserinfoand_Userpost())

        if (Userinfo.id == user_id) {
            navigation.navigate("Myprofile")
        } else {
            navigation_2.navigate("OtherUserProfile", {
                user_id: user_id
            })
        }
    }
    return (
        <View
            style={[styles.postHeader, styles.row]}
        >
            <View
                style={styles.row}
            >
                <TouchableOpacityEx

                    onPress={() => {
                        onPressProfile()
                    }}


                >

                    <FastImage
                        style={styles.profileImage}
                        source={{ uri: IMAGEURL + profileImage }}
                    />
                </TouchableOpacityEx>
                <TouchableOpacityEx
                    style={styles.View_101_102}
                    onPress={() => {
                    }}
                >
                    <Text
                        style={styles.name}
                    >{username?.slice(0, 13)} {username.length > 13 && "..."} </Text>
                    <Text
                        style={styles.date}
                    >
                        {moment(time).fromNow()}
                    </Text>

                </TouchableOpacityEx>
            </View>

            {Userinfo.id != user_id &&!hidemenu_btn&&<TouchableOpacityEx
                onPress={() => {
                    if (MenuPress) {

                        MenuPress(index)
                    }
                }}
            >

                <VectorIcon
                    family='MaterialCommunityIcons'
                    name='dots-vertical'
                    size={25}
                    color="#635965"
                />
            </TouchableOpacityEx>}



        </View>
    )
}

export default memo(PostHeader)

const styles = StyleSheet.create({
    View_101_102: {
        marginLeft: "3%"

    },
    date: {
        fontSize: normalize(13),
        fontWeight: '400',
        color: "#635965",
        fontFamily: Fonts.normal

    },
    name: {
        fontSize: normalize(14),
        fontWeight: '700',
        color: "#000",
        fontFamily: Fonts.normal

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    postHeader: {

    },
    profileImage: {
        width: width * 0.13,
        height: width * 0.13,
        borderRadius: width * 0.13 / 2,
        resizeMode: "cover",


    }
})