import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Fonts } from '../../Theme'
type selectedIndexprops = { [key: string]: any }
interface Props {
    getSelected: (selectedInterest:object) => void;
    heading:object
    }
const ChooseInterest = (props:Props) => {
    const Interest = [
        {
            name: "Games"
        },
        {
            name: "Cricket"
        }, {
            name: "Music"
        }, {
            name: "Actions"
        }
    ]
    const [selectedIndex, setSelectedIndex] = useState<selectedIndexprops>({})

    const RenderInterestButton = (item: any, index: number) => {
        return (
            <LinearGradient
                colors={["#12C2E9", "#C471ED", "#F64F59", "#F64F59"]}
                start={{x: 0, y: 1}} end={{x: 1, y: 0}}
                style={[styles.linerstyle, selectedIndex[index]!=undefined ? {

                } : {

                    padding: 1

                }]} // add padding so it work as border of TextInput
                key={`interest-${index}`}
            >
                <TouchableOpacity
                    key={`Interestbuttons ${index}`}
                    style={[styles.btn, selectedIndex[index]!=undefined ? {

                    } : {
                        backgroundColor: "#212121"

                    }
                    ]}
                    onPress={() => {
                        let copydata={ ...selectedIndex }
                        if (selectedIndex[index]!=undefined) {
                            // setSelectedIndex({...selectedIndex, [index]: false})
                           
                            delete copydata[index]
                            setSelectedIndex(copydata)
                        } else {
                            copydata={ ...selectedIndex, [index]: item.name }
                            setSelectedIndex(copydata)
                        }
                        props.getSelected(copydata)
                        
                    }}
                >
                    <Text
                        style={styles.txt}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }

    return (
        <>
        <Text
          style={[props.heading, {
            width: "70%",
            marginTop: "10%",
            marginLeft:"4%"
          }]}
        >
          Select your interest
        </Text>
        <View
            style={styles.row}
        >
            {
                Interest.map((item: any, index: number) => {
                    return RenderInterestButton(item, index)
                })
            }

        </View>
        </>
    )
}

export default ChooseInterest

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
        height:"50%",

        width:"90%",
        alignSelf:"center",


    },
    txt: {
        fontSize: 14,
        color: Colors.white,
        fontFamily: Fonts.normal

    },
    btn: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 25,

    },
    linerstyle: {
        borderRadius: 25,
        marginTop: 10,
        marginLeft: "3%",
        // flex: 1
    }

})