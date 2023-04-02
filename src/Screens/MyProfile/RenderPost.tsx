import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import FastImage from 'react-native-fast-image'
import withPreventDoubleClick from '../../Component/withPreventDoubleClick'
const { width, height } = Dimensions.get("window")
type RenderPostProps = {
    item: any,
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
    return (
        <TouchableOpacityex
            style={[styles.container, {
                marginTop: isFirstRow ? 8 : 0
            }]}
        >
            <FastImage
                source={{
                    uri: props.item.img
                }}
                style={styles.img}
            />
        </TouchableOpacityex>
    )
}

export default RenderPost

const styles = StyleSheet.create({
    container: {

        width: width * 0.33,
        height: width * 0.35,

        paddingLeft: 5,
        paddingRight: 5,
        overflow: "hidden"

    },
    img: {
        width: "100%",
        height: width * 0.33,
        borderRadius: 12
    }
})