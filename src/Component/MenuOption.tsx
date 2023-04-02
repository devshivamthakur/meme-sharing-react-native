import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import VectorIcon from './VectorIcons'
import withPreventDoubleClick from './withPreventDoubleClick'
import { Colors, Fonts } from '../Theme'
import { normalize } from '../../Normalize'
import { BlurView } from '@react-native-community/blur'
const TouchableOpacityex = withPreventDoubleClick(TouchableOpacity)
type MenuOptionprops={
    closepressed: ()=>void,
    reportpressed: ()=>void,
    blockpressed: ()=>void,
    visible:boolean
}
const MenuOption = (props:MenuOptionprops) => {
    return (
        <View>
            <Modal
                transparent
                animationType='slide'
                visible={props.visible}
            >
                <View
                    style={styles.flexend}
                >
                    <BlurView
                        style={styles.absolute}
                        blurType="dark"
                        blurAmount={10}
                        reducedTransparencyFallbackColor="black"
                    />
                    <TouchableOpacityex
                     style={styles.absolute}
                     onPress={() =>{
                        props.closepressed()

                     }}
                    />

                    <View
                        style={styles.box}
                    >
                        <TouchableOpacityex
                        style={styles.closeicon}
                        onPress={() =>{
                            props.closepressed()
    
                         }}
                        >

                            <VectorIcon
                                family='AntDesign'
                                name='close'
                                size={25}

                            />
                        </TouchableOpacityex>
                        <TouchableOpacityex
                            style={[styles.row]}
                            onPress={() =>{
                                props.reportpressed()
        
                             }}
                        >
                            <View
                                style={styles.boxicon}
                            >

                                <VectorIcon
                                    family="Octicons"
                                    name="report"
                                    size={35}
                                    color='black'
                                />
                            </View>
                            <Text
                                style={styles.text}
                            >
                                Report
                            </Text>

                        </TouchableOpacityex>
                        <TouchableOpacityex
                            style={[styles.row]}
                            onPress={() =>{
                                props.blockpressed()
        
                             }}
                        >
                            <View
                                style={styles.boxicon}
                            >

                                <VectorIcon
                                    family="Entypo"
                                    name="block"
                                    size={35}
                                    color='black'
                                />
                            </View>
                            <Text
                                style={styles.text}

                            >
                                Block
                            </Text>

                        </TouchableOpacityex>

                    </View>


                </View>
            </Modal>
        </View>
    )
}

export default MenuOption
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: Colors.lowblack

    },
    box: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12

    },
    flexend: {
        flex: 1,
        justifyContent: "flex-end"
    },
    boxicon: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10
    },
    text: {
        fontFamily: Fonts.normal,
        fontSize: normalize(14),
        color: Colors.black,
        marginLeft: "5%"
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    closeicon:{
        alignSelf:"flex-end",
        padding:10,
    }
})