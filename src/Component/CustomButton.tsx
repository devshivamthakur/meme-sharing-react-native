import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Fonts } from '../Theme'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import VectorIcon from './VectorIcons'

interface CustomButtonProps{
    title?:string,
    image?:any,
    iconname?:string,
    iconfamily?: "AntDesign"|"FontAwesomeIcons",
    iconColor?:string,
    iconSize?:number,
    textcolor?:string,
    backgroundColor?:string,
    onPress?:()=>void,
    textStyle?:object,
    buttonStyle?:object,
    linerColor?:[],
    imageStyle?:object,
    disableLinear?:false|boolean

}
const CustomButton = (props:CustomButtonProps) => {
    let COLORS_=["transparent","transparent"]

  return (
    <LinearGradient
    colors={
        props.disableLinear?COLORS_: props.linerColor?props.linerColor:["#12C2E9","#C471ED","#F64F59","#F64F59"]
    }
    style={[styles.buttonStyle,props.buttonStyle]}
    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
    >
        <TouchableOpacity
        onPress={props.onPress}
        >
            
            {
                props.iconfamily!=undefined?(<VectorIcon
                name={props.iconname?props.iconname:props.iconfamily}
                family={props.iconfamily}
                size={props.iconSize?props.iconSize:20}
                color={props.iconColor?props.iconColor:Colors.white}
                />):(props.image?
                <Image source={props.image} style={
                    [styles.imageStyle,props.imageStyle]}
                />
                :
                <Text style={[styles.textStyle,props.textStyle]}>{props.title}</Text>)
            }

        </TouchableOpacity>

    </LinearGradient>
  )
}

export default CustomButton

const styles=StyleSheet.create({
    buttonStyle:{
        width:"100%",
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        overflow:"hidden"
    },
    imageStyle:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    textStyle:{
        color:Colors.white,
        fontSize:14,
        fontWeight:"600",
        fontFamily:Fonts.normal
    }
})