import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect } from 'react'
import LinerGradiantView from '../../Component/LinerGradiantView'
import { BlurView } from '@react-native-community/blur'
import { Colors, Fonts, images } from '../../Theme'
import withPreventDoubleClick from '../../Component/withPreventDoubleClick'
import FastImage from 'react-native-fast-image'
import { normalize } from '../../../Normalize'
import LinearGradient from 'react-native-linear-gradient'
import { AppStackParamList } from '../../Router'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type HomeNativeStackNavigationpros = NativeStackNavigationProp<AppStackParamList,"SocialTab">

const TouchableOpacityex = withPreventDoubleClick(TouchableOpacity)
type menuType = {
    title: string,
    image: any,
    type:string

}
const CreateOptions = () => {
    const [fadeAnim] = React.useState(new Animated.Value(0))
    const navigation = useNavigation<HomeNativeStackNavigationpros>()

    const Menus = [
        {
            title: "Feed",
            image: images.createfeed,
            type:"Feed"
        },
        {
            title: "Photo",
            image: images.photo,
            type:"image"
        }, {
            title: "Video",
            image: images.video,
            type:"video"
        }
    ]
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,


        }).start()

    }, [])
    const onPressOptions = (index: number) => {
        switch (index) {
            case 1://feed
                break;
            case 2://photos
                break;
            case 3://videos
                break

        }
    }

    return (
        <LinerGradiantView
            style={{
                justifyContent: "flex-end",

            }}
        >
            {/* <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={10}
                reducedTransparencyFallbackColor="black"
            /> */}
            <Animated.View
                style={[styles.container, {
                    opacity: fadeAnim
                }]}
            >
                <Text
                    style={styles.heading}
                >
                    What you want to create?
                </Text>
                {
                    Menus.map((item: menuType, index: number) => {
                        return (
                            <TouchableOpacityex
                                style={styles.optionrow}
                                key={`menu-${index}`}
                                onPress={() => {
                                    navigation.navigate("Create",{
                                        type:item.type
                                    })

                                }}
                            >
                                <LinearGradient
                                    colors={["#12C2E9", "#C471ED", "#F64F59", "#F64F59"]}
                                    start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                                    style={[styles.linerstyle]} // add padding so it work as border of TextInput
                                    key={`interest-${index}`}>

                                    <View
                                        style={styles.imgcontainer}
                                    >

                                        <FastImage
                                            source={item.image}
                                            style={styles.img}
                                        />
                                    </View>
                                </LinearGradient>
                                <Text
                                    style={styles.txt}
                                >
                                    {
                                        item.title
                                    }
                                </Text>
                            </TouchableOpacityex>
                        )
                    })
                }

            </Animated.View>
        </LinerGradiantView>
    )
}

export default CreateOptions

const styles = StyleSheet.create({


    txt: {
        fontSize: normalize(14),
        color: Colors.black,
        fontWeight: "400",
        fontFamily: Fonts.normal,
        marginLeft: "5%"

    },
    heading: {
        fontSize: normalize(15),
        color: Colors.black,
        fontWeight: "600",
        fontFamily: Fonts.semiBold,
        margin: 10,


    },
    linerstyle: {
        borderRadius: 8,
        padding: 1,

        // flex: 1
    },
    imgcontainer: {
        // borderWidth: 1,
        // borderColor: "#212121",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"

    },
    img: {
        height: 20,
        width: 20,
        resizeMode: "contain"

    },
    container: {
        backgroundColor: "#fff",
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        paddingTop: 15

    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    optionrow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomColor: "#212121",
        borderBottomWidth: 0.5,
        paddingLeft: 13

    }
})