import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { normalize } from '../../../Normalize';
import { IMAGEURL } from '../../Apiendpoints';
import CustomButton from '../../Component/CustomButton';
import { pickImageVideo, takeImageVideo, takePermission } from '../../Component/Helper';
import LinerGradiantView from '../../Component/LinerGradiantView';
import MyHeader from '../../Component/MyHeader';
import UserNavigationProp from "../../Component/UserNavigationProp";
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { Colors, Fonts } from '../../Theme';
import {  NAME_REGEX, USERNAME_REGEX, saveToAsyncStorage } from '../../Utils';
import { ErrorMessage } from '../../Component/ErrorMessage';
import { updatemodalloader } from '../../Redux/Reducers/UserinfoSlice';
import { updateUserinfothunk, uploadfileThunk } from '../../Redux/Actions/Signupactions';
import { showMessage } from 'react-native-flash-message';
import { USERINFO } from '../../Asynckey';
interface EditProfileprops {
    navigation: UserNavigationProp<"Settings">
}

export const EditProfile = (props: EditProfileprops) => {
    const Userinfo = useAppSelector(state => state.userinfo.userinfo)
    const UserToken = useAppSelector(state => state.userinfo.userToken)
    const dispatch = useAppDispatch()
    const [updatedEmail] = useState(Userinfo.email);
    const [updatedUsername, setUpdatedUsername] = useState(Userinfo.username);
    const [updatedFullName, setUpdatedFullName] = useState(Userinfo.name);
    const [ProfilePicUrl, setProfilePicUrl] = useState(IMAGEURL + Userinfo.profileurl);
    const [nameerror, setNameError] = useState('');
    const [usernameerror, setUsernameError] = useState('');

    const PickImage = async () => {
        Alert.alert("Select Image", "Choose from where you want to select image", [
            {
                text: "Camera",
                onPress: () => {
                    takePermission().then((res) => {
                        if (res) {
                            takeImageVideo("image").then((res) => {
                                setProfilePicUrl(res.path)

                            })
                        }

                    }).catch((err) => {
                    }
                    )
                }
            }, {
                text: "Gallery",
                onPress: () => {
                    takePermission().then((res) => {
                        if (res) {
                            pickImageVideo("image").then((res) => {

                                setProfilePicUrl(res.path)

                            })
                        }

                    }).catch((err) => {
                    }
                    )
                }
            }
        ])

    }
  
    const validate_name = (name: string) => {
        let error = ''
        if (!name) {
            error = "Name can't be blank"
        }
        if (name && name.length < 3) {
            error = "Name is too short"
        }
        if (name && !NAME_REGEX.test(name)) {
            error = "Name is invalid"
        }
        setNameError(error)
        return error == '';
    }

    const validate_username = (username: string) => {
        let error = ''
        if (!username) {
            error = "Username can't be blank"
        }
        if (username && username.length < 3) {
            error = "Username is too short"
        }
        if (username && !USERNAME_REGEX.test(username)) {
            error = "Username is invalid"
        }
        setUsernameError(error)
        return error == '';

    }
    const onPressNext = () => {
        let flag = true;
        if (!validate_name(updatedFullName)) {
            flag = false;
        }
        if (!validate_username(updatedUsername)) {
            flag = false;
        }
        
        if (flag) {
            SaveintoDb()

        }

    }
    const SaveintoDb = () => {
        if (Userinfo.profileurl != ProfilePicUrl) {


            let formdata = new FormData();
            formdata.append("file", {
                name: "filename.png",
                type: "image/png",
                uri: ProfilePicUrl


            })
            formdata.append("media_type", "image")
            dispatch(updatemodalloader(true))
            dispatch(uploadfileThunk(formdata)).unwrap().then((response) => {
                let profileinfo = { ...Userinfo }
                profileinfo['username'] = updatedUsername
                profileinfo['profileurl'] = response.name
                profileinfo['name'] = updatedFullName
                profileinfo['token'] = UserToken

                dispatch(updateUserinfothunk(profileinfo))
                    .unwrap().then((res) => {
                        dispatch(updatemodalloader(false))
                        showMessage({
                            message: "Profile updated successfully",
                            type: "success",
                            icon: "success",
                            duration: 3000
                        })
                        const profileinfo = {
                            data: res,
                            token: UserToken
                        }
                        saveToAsyncStorage(USERINFO, JSON.stringify(profileinfo))

                        props.navigation.goBack()

                    }).catch((err: any) => {

                        dispatch(updatemodalloader(false))

                    })


            }).catch((err: any) => {
                ErrorMessage(err.response)
                dispatch(updatemodalloader(false))
            })
        } else {
            dispatch(updatemodalloader(false))
            let profileinfo = { ...Userinfo }
            profileinfo['username'] = updatedUsername
            profileinfo['name'] = updatedFullName
            profileinfo['token'] = UserToken

            dispatch(updateUserinfothunk(profileinfo))
                .unwrap().then((res) => {
                    dispatch(updatemodalloader(false))
                    showMessage({
                        message: "Profile updated successfully",
                        type: "success",
                        icon: "success",
                        duration: 3000
                    })
                    const profileinfo = {
                        data: res,
                        token: UserToken
                    }
                    saveToAsyncStorage(USERINFO, JSON.stringify(profileinfo))

                    props.navigation.goBack()

                }).catch((err: any) => {


                    dispatch(updatemodalloader(false))

                })
        }
    }

    return (
        <LinerGradiantView style={styles.container}>
            <MyHeader
                title={'Edit Profile'}
                titlestyle={styles.titlestyle}
                leftPress={() => {
                    props.navigation.goBack()
                }}
            />
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.55)",
                    borderTopStartRadius: 37,
                    borderTopEndRadius: 37,
                }}

            >

                <ScrollView>

                    <View style={styles.profilePhotoContainer}>
                        <FastImage
                            source={ProfilePicUrl ? { uri: ProfilePicUrl } : { uri: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" }}
                            style={styles.profilePhoto} />

                        <TouchableOpacity
                            style={styles.cameraicon}
                            onPress={() => {
                                PickImage()
                            }}
                        >
                            <MaterialCommunityIcons
                                name="camera"
                                size={30}
                                color={Colors.black}

                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            value={updatedEmail}

                            style={styles.input}
                            placeholder="Email"
                            editable={false}
                        />
                      
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            value={updatedUsername}
                            onChangeText={(text) => {
                                validate_username(text)
                                setUpdatedUsername(text)
                            }}
                            style={styles.input}
                            placeholder="Username"
                        />
                        {
                            usernameerror != '' && <Text
                                style={styles.errortxt}
                            >
                                {usernameerror}
                            </Text>
                        }
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            value={updatedFullName}
                            onChangeText={(text) => {
                                validate_name(text)
                                setUpdatedFullName(text)
                            }}
                            style={styles.input}
                            placeholder="Full Name"
                        />
                        {
                            nameerror != '' && <Text
                                style={styles.errortxt}
                            >
                                {nameerror}
                            </Text>
                        }
                    </View>


                    <CustomButton

                        onPress={onPressNext}
                        buttonStyle={styles.btn2}
                        title="Submit"
                        textStyle={styles.btntxt}
                    />
                </ScrollView>



            </View>

        </LinerGradiantView>
    );
};

const styles = StyleSheet.create({
    errortxt: {
        fontSize: normalize(13),
        color: 'red',
        fontWeight: "400",
        fontFamily: Fonts.normal,
        marginTop: 5


    },
    btntxt: {
        color: Colors.white,
        fontFamily: Fonts.normal,
        fontSize: 15,
        fontWeight: "500",
    },
    btn2: {
        width: "40%",
        height: 50,
        borderRadius: 50,
        backgroundColor: "#488795",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%"
    },
    cameraicon: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignSelf: "center",
        position: "absolute",
        bottom: -20,
        right: -5,


    },
    titlestyle: {
        fontSize: normalize(18),
        fontWeight: "600"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profilePhotoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: "center",
        marginTop: "2%"
    },
    profilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 100,
        alignSelf: "center",
        borderWidth: 2,
        borderColor: Colors.white,
    },
    profilePhotoInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingLeft: 10,
    },
    inputContainer: {
        marginBottom: 20,
        width: "90%",
        alignSelf: "center"
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: Colors.black
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingLeft: 10,
        color: Colors.black,
        fontSize: normalize(15)
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
