import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import LinerGradiantView from '../../Component/LinerGradiantView';
import MyHeader from '../../Component/MyHeader';
import { normalize } from '../../../Normalize';
import { Colors, Fonts, images } from '../../Theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { pickImageVideo, takeImageVideo, takePermission } from '../../Component/Helper';
import CustomButton from '../../Component/CustomButton';
import { EMAIL_REGEX, NAME_REGEX, USERNAME_REGEX } from '../../Utils';
import UserNavigationProp from "../../Component/UserNavigationProp"
interface EditProfileprops {
    navigation: UserNavigationProp<"Settings">
}

export const EditProfile = (props: EditProfileprops) => {
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [updatedFullName, setUpdatedFullName] = useState("");
    const [ProfilePicUrl, setProfilePicUrl] = useState(null);
    const [emailerror, setEmailerror] = useState('');
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
                                console.log("res", res.path)
                                setProfilePicUrl(res.path)

                            })
                        }

                    }).catch((err) => {
                        console.log("err", err)
                    }
                    )
                }
            }, {
                text: "Gallery",
                onPress: () => {
                    takePermission().then((res) => {
                        if (res) {
                            pickImageVideo("image").then((res) => {
                                console.log("res", res.path)
                                setProfilePicUrl(res.path)

                            })
                        }

                    }).catch((err) => {
                        console.log("err", err)
                    }
                    )
                }
            }
        ])

    }
    const validateEmail = (email: string) => {
        let error = ''
        if (!email) {
            error = "Email can't be blank"

        }
        if (email && !EMAIL_REGEX.test(email)) {
            console.log("email", email)
            error = "Email is invalid"
        }
        setEmailerror(error)
        return error == null;


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
        return error == null;
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
        console.log("username", username, "error", error)
        setUsernameError(error)
        return error == null;

    }
    const onPressNext = () => {
        let flag = true;
        if (!validate_name(updatedFullName)) {
            flag = false;
        }
        if (!validate_username(updatedUsername)) {
            flag = false;
        }
        if (!validateEmail(updatedEmail)) {
            flag = false;
        }
        if (flag) {

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
                        <Image
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
                            onChangeText={(text: string) => {
                                validateEmail(text)
                                setUpdatedEmail(text)
                            }}
                            style={styles.input}
                            placeholder="Email"
                        />
                        {
                            emailerror != '' && <Text
                                style={styles.errortxt}
                            >
                                {emailerror}
                            </Text>
                        }
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
