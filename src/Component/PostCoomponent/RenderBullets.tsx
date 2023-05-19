import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
interface bulltesprops {
    size: number,
    activeindex: number
}
const RenderBullets = (props: bulltesprops) => {
    const dataArray = Array.from(Array(props.size).keys());

    return (
        <View
            style={Styles.row}
        >
            {
                dataArray.map((item, index) => {
                    return (
                        <View
                            style={[Styles.dot, {
                                backgroundColor: props.activeindex == index ? "#2596be" : "#ccc"
                            }]}

                            key={index}
                        />
                    )

                })

            }


        </View>
    )
}

export default RenderBullets

const Styles = StyleSheet.create({
    dot: {
        width: 8,
        height: 8,
        borderRadius:8/2,
        marginHorizontal:2


    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop:5
       

    }
})