import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import LinerGradiantView from '../../Component/LinerGradiantView'
import MyHeader from '../../Component/MyHeader'
import { normalize } from '../../../Normalize'
import { Colors, Fonts } from '../../Theme'
import UserNavigationProp from "../../Component/UserNavigationProp"
interface Props{
  navigation:UserNavigationProp<"Deactivateaccount">
}
const Deactivateaccount = (props:Props) => {
    return (
        <LinerGradiantView>
            <MyHeader
                title={"Delete Account"}
                titlestyle={styles.titlestyle}
                leftPress={() => {
                    props.navigation.goBack()
                }}
                style={{

                }}

            />
            <View
                style={styles.containerStyle}
            >
                <Text
                    style={styles.txt1}
                >
                    You will Permanently lose your all your personal information. After this ,there is no turning back.
                </Text>
                <TouchableOpacity style={styles.deactivateButton} onPress={() => {

                }}>
                    <Text style={styles.deactivateButtonText}>Deactivate Account</Text>
                </TouchableOpacity>
            </View>
        </LinerGradiantView>
    )
}

export default Deactivateaccount
const styles = StyleSheet.create({
    deactivateButton: {
        backgroundColor: '#FF0000',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
        marginTop:"30%"
    },
    deactivateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    txt1: {
        fontSize: normalize(18),
        color: Colors.black,
        fontFamily: Fonts.normal,
        marginTop: "5%"


    },
    titlestyle: {
        fontSize: normalize(18),
        fontWeight: "600"
    },
    containerStyle: {
        width: "95%",
        alignSelf: "center"
    },

})