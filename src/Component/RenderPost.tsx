import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import FastImage from 'react-native-fast-image'
import withPreventDoubleClick from './withPreventDoubleClick'
import { UserPost } from '../Redux/Sliceinterface'
import { IMAGEURL } from '../Apiendpoints'
import { Fonts } from '../Theme'
const { width, height } = Dimensions.get("window")
type RenderPostProps = {
    item: UserPost,
    index: number
}


const TouchableOpacityex = withPreventDoubleClick(TouchableOpacity)
const RenderPost = (props: RenderPostProps) => {
    const isFirstRow = useMemo(() => {
        if (props.index == 0 || props.index == 1 || props.index == 2) {
            return true

        }
        return false

    }, [props.index])
    const ImagePost: React.FC = () => {
        return (
            <FastImage
                source={{
                    uri: IMAGEURL + props.item.media[0].file
                }}
                style={styles.img}
            />
        )
    }
    const VideoPost: React.FC = () => {
        return (
            <FastImage
                source={{
                    uri: IMAGEURL+props.item.media[0].thumbnail_url
                }}
                style={[styles.img, {
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.5)",
                }]}
            />
        )
    }
    const TextPost: React.FC = () => {
        return (
            <View
                style={styles.txtview}
            >
                <Text

                    style={styles.txt}
                >
                    {props.item.description.slice(0, 15)}
                    {
                        props.item.description.length > 15 && "..."
                    }
                </Text>

            </View>

        )
    }
    const RenderPost_: Record<string, React.FC> = {
        "image": ImagePost,
        "video": VideoPost,
        "text": TextPost
    }
    const PostComponent = RenderPost_[props.item.post_type];

    return (
        <TouchableOpacityex
            style={[styles.container, {
                marginTop: isFirstRow ? 8 : 0,

            }]}
        >
            {PostComponent && <PostComponent />}


        </TouchableOpacityex>
    )
}

export default RenderPost

const styles = StyleSheet.create({
    txtview: {
        width: "100%",
        height: width * 0.33,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center"



    },
    container: {

        width: width * 0.33,
        height: width * 0.35,

        paddingLeft: 5,
        paddingRight: 5,
        overflow: "hidden",

    },
    img: {
        width: "100%",
        height: width * 0.33,
        borderRadius: 12
    },
    txt: {
        color: "#212121",
        fontSize: 14,
        fontWeight: "400",
        fontFamily: Fonts.normal

    }
})