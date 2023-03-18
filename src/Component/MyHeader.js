import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Fonts } from '../Theme'
const MyHeader = ({
    title,
    leftPress,
    hideLeft=false
}) => {
    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
            onPress={()=>{
                if(leftPress){
                    leftPress()
                }
            }}
            
            >
                {!hideLeft&&<EvilIcons
                    name="arrow-left"
                    size={30}
                    color="#fff"
                />}
            </TouchableOpacity>
            <Text
            style={styles.title}
            adjustsFontSizeToFit
            >
                {title}
            </Text>

        </View>
    )
}

export default MyHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        padding:5,
        flexDirection: "row",
        width:"55%",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:10
    },
    title:{
        color:"#fff",
        fontSize:15,
        fontFamily:Fonts.normal,
        fontWeight:"600",


    }
})