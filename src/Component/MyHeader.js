import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Fonts } from '../Theme'
const MyHeader = ({
    title,
    leftPress,
    hideLeft=false,
    color="#fff",
    style={},
    titlestyle={}
}) => {
    return (
        <View
            style={[styles.container,style]}
        >
            <TouchableOpacity
            onPress={()=>{
                if(leftPress){
                    leftPress()
                }
            }}
            style={{
                backgroundColor:"transparent",
            }}
            
            >
                {!hideLeft&&<EvilIcons
                    name="arrow-left"
                    size={30}
                    color={color}
                />}
            </TouchableOpacity>
            <Text
            style={[styles.title,titlestyle]}
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
        width:"100%",
        alignItems:"center",
        marginTop:10
    },
    title:{
        color:"#fff",
        fontSize:15,
        fontFamily:Fonts.normal,
        fontWeight:"600",
        alignSelf:"center",
        textAlign:"center",
        width:"86%"



    }
})