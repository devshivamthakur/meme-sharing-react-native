import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid } from 'react-native';

export const takePermission = async () => {
    try {
        console.log("in take permission")
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,

            {
                title: 'App needs access to your camera',
                message: 'App needs access to your camera',
            },
        );
        return Promise.resolve(granted===PermissionsAndroid.RESULTS.GRANTED)
       
    } catch (err) {

        console.warn(err);
    }
}
export const pickImageVideo =  (type) => {


    return new Promise((resolve, reject) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: type,
            compressImageQuality: 0.5,
        }).then(image => {
            resolve(image)
        }).catch(err => {
            reject(err)
        })
    })

}
export const takeImageVideo = (type) => {
    return new Promise((resolve, reject) => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: type,
            compressImageQuality: 0.5,
        }).then(image => {
            resolve(image)
        }).catch(err => {
            reject(err)
        })
    })
}

