import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { images, Fonts, Colors } from '../../Theme'
import { normalize } from '../../../Normalize'
import withPreventDoubleClick from '../withPreventDoubleClick'
type Meuutype = {
    title: string,
    img: any

}
const Menu = [

    { title: 'Edit Profile', img: images.edit },
    { title: 'About', img: images.icon_info_colored },
    { title: 'Terms & Conditions', img: images.terms_colored },
    { title: 'Privacy Policy', img: images.icon_privacy },
    { title: 'Blocked accounts', img: images.blockAccounts },
    { title: 'Delete Account', img: images.deleteAccount },
    { title: 'Logout', img: images.logout },

]
interface Settings {
    profieinfocontainer: object,
    onPressSettingsMenu:(index:number)=>void;
}

const TouchableOpacityex=withPreventDoubleClick(TouchableOpacity)
const SettingsMenu = (props: Settings) => {
    return (
        <View
            style={[props.profieinfocontainer,{
                marginTop:10
            }]}
        >
            {
                Menu.map((item: Meuutype, index: number) => {
                    return (
                        <TouchableOpacityex
                            key={`settingsmenu-${index}`}
                            style={[styles.row, {
                                borderBottomWidth: index == Menu.length - 1 ? 0 : 1

                            }]}
                            onPress={()=>{
                                props.onPressSettingsMenu(index)
                            }}
                        >
                            <Image
                                source={item.img}
                                style={styles.imgstyle}
                            />
                            <Text
                                style={styles.text}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacityex>
                    )
                })
            }
        </View>
    )
}

export default SettingsMenu

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        width: "100%",
        borderBottomColor: Colors.appGraycolor,
        padding: 5,
        alignItems:"center",
        paddingBottom:10,
        paddingTop:10
    },
    imgstyle: {
        width: 35,
        height: 35,
        resizeMode: "contain",

    },
    text: {
        fontSize: normalize(14),
        color: Colors.black,
        fontFamily: Fonts.normal,
        marginLeft:15

    }
})
