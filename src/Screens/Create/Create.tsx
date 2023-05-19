import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import LinerGradiantView from '../../Component/LinerGradiantView'
import MyHeader from '../../Component/MyHeader'
import { normalize } from '../../../Normalize'
import { Colors, Fonts, images } from '../../Theme'
import CustomButton from '../../Component/CustomButton'
import { AddImageItem } from '../../Component/AddImageItem'
import { pickImageVideo, takeImageVideo, takePermission } from '../../Component/Helper'
import UserNavigationProp from "../../Component/UserNavigationProp"
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Router'
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks'
import { CreatePost_thunk } from '../../Redux/Actions/Postinfoactions'
import { updatemodalloader } from '../../Redux/Reducers/UserinfoSlice'
import FastImage from 'react-native-fast-image'
import { IMAGEURL } from '../../Apiendpoints'
import { showMessage } from 'react-native-flash-message'
import { uploadfileThunk } from '../../Redux/Actions/Signupactions'
import { ErrorMessage } from '../../Component/ErrorMessage'
import { createThumbnail } from "react-native-create-thumbnail";

type CreateScreenRouteProp = RouteProp<AppStackParamList, 'Create'>;

type imagerray = {
  type: string,
  uri: string
}

type imagearray__ = {
  media_type: string,
  file: string,
  thumbnail_url?: string
}

type Props = {
  navigation: UserNavigationProp<'Create'>;
  route: CreateScreenRouteProp
};
type PostType = "Feed" | "image" | "video" | string;

type PostTypeMapping = {
  [key in PostType]: string;
};

type postdatatype = {

}
const Create = ({ navigation, route }: Props) => {
  const [postDesc, setPostDesc] = useState("")
  const [postDescerror, setPostDescerror] = useState("")
  const [mediaerror, setMediaerror] = useState("")
  const [createPostImgArray, setcreatePostImgArray] = useState<imagerray[]>([])
  const dispatch = useAppDispatch()
  const userinfo = useAppSelector(state => state.userinfo.userinfo)

  let type = route.params.type
  const PickImage = async () => {
    Alert.alert("Select " + type, "Choose from where you want to select image", [
      {
        text: "Camera",
        onPress: () => {
          takePermission().then((res) => {
            if (res) {
              takeImageVideo(type).then((res) => {
                AppendMedia(res)

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
              pickImageVideo(type).then((res) => {
                AppendMedia(res)

              })
            }

          }).catch((err) => {
          }
          )
        }
      }
    ])

  }
  const AppendMedia = (response: any) => {
    if(type =="video") {
      if(response.duration<3000){

        alert("Minumum video duration is 3 seconds.")
        return
      }else if (response.duration>30*1000){
        alert("Max video duration is 30 seconds.")
        return
      }

    }
    let copy = [...createPostImgArray]
    copy.push({
      type: type,
      uri: response.path
    })
    setMediaerror("")
    setcreatePostImgArray(copy)


  }
  const deleteImage = (index: number) => {
    let copy = [...createPostImgArray]
    copy.splice(index, 1)
    setcreatePostImgArray(copy)

  }
  const validateFeed = (postDesc: string) => {
    if (postDesc == "") {
      setPostDescerror("Post description should not be empty.")
      return false

    } else if (postDesc.length < 15) {
      setPostDescerror("Post description length must be at least 15 characters.")
      return false

    } else {
      setPostDescerror("")
      return true
    }

  }

  const validateMedia = () => {
    if (createPostImgArray.length == 0) {
      setMediaerror("Please select at least one media file.")
      return false
    }
    setMediaerror("")
    return true

  }
  const generateThumbnail = async (url: string) => {
    let thumbnailUrl = await createThumbnail({
      url: url,
      timeStamp: 2000,
    })
    return Promise.resolve(thumbnailUrl)

  }
  const uploadimage = () => {
    let imagearray_: imagearray__[] = []

    dispatch(updatemodalloader(true))
    createPostImgArray.map((item, index) => {
      let thumbnail_res = ""
      if (item.type == "video") {
        generateThumbnail(item.uri).then((thumbnailurl) => {

          let formdata = new FormData();
          formdata.append("file", {
            name: `${new Date().getTime()}.png`,
            type: `image/png`,
            uri: thumbnailurl.path
          })
          formdata.append("media_type", "image")
          dispatch(uploadfileThunk(formdata)).unwrap().then((response) => {
            thumbnail_res = response.name

          }).catch((err) => {
            ErrorMessage(err.response)
            dispatch(updatemodalloader(false))


          })
        })

      }
      let formdata = new FormData();
      formdata.append("file", {
        name: `${new Date().getTime()}.${type == "image" ? "png" : "mp4"}`,
        type: `${item.type}/${type == "image" ? "png" : "mp4"}`,
        uri: item.uri
      })
      formdata.append("media_type", type)
      dispatch(uploadfileThunk(formdata)).unwrap().then((response) => {
        let imageArraydata:imagearray__ = {
          "media_type": type,
          file: response.name
        }
          imageArraydata["thumbnail_url"] = thumbnail_res

        
        imagearray_.push(imageArraydata)
        if (createPostImgArray.length == imagearray_.length) {
          dispatch(updatemodalloader(false))

          createPost(imagearray_)
        }

      }).catch((err) => {
        ErrorMessage(err.response)
        dispatch(updatemodalloader(false))


      })




    })

  }
  const validate = () => {
    if (type == "Feed") {
      if (!validateFeed(postDesc)) {
        return;
      } else {
        createPost([])
      }
    } else {
      if (!validateMedia()) {
        return;
      } else {

        uploadimage()

      }

    }

  }

  const createPost = (imagearray_: imagearray__[]) => {
    let posttype: PostTypeMapping = {
      "Feed": "text",
      "image": "image",
      "video": "video"
    }
    let data: postdatatype = {
      post_type: posttype[type]
    }
    if (type == "Feed") {
      data = {
        ...data,
        description: postDesc
      }
    } else {
      data = {
        ...data,
        media: imagearray_
      }

    }
    dispatch(updatemodalloader(true))
    dispatch(CreatePost_thunk(data)).unwrap().then((response) => {
      dispatch(updatemodalloader(false))
      showMessage({
        message: "Post created successfully.",
        type: "success",
        icon: "success",
        duration: 3000
      })
      navigation.replace("SocialTab")

    }).catch((error) => {
      dispatch(updatemodalloader(false))


    })


  }
  return (
    <LinerGradiantView>
      <MyHeader
        title={`Create a new Post`}
        leftPress={() => {

          navigation.goBack()
        }}
        style={styles.header}
        color='#000'
        titlestyle={styles.headeTitlestyle}
      />

      <View
        style={styles.row}
      >
        <View style={styles.profileImg}>
          <FastImage
            resizeMode={"cover"}
            style={{
              width: 45,
              height: 45,
              borderRadius: 45 / 2
            }}
            source={{ uri: IMAGEURL + userinfo.profileurl }}
          />
        </View>
        <View style={{ width: "80%", paddingHorizontal: "3%" }}>
          {type == "Feed" && <TextInput
            value={postDesc}
            maxLength={200}
            multiline
            placeholderTextColor="#707070"
            placeholder="Write a caption. . ."
            onChangeText={(value) => {
              setPostDesc(value);
              validateFeed(value)

            }}
            style={styles.vwDesc}

          />}
          {
            postDescerror != "" && <Text
              style={styles.error}
            >
              {postDescerror}
            </Text>
          }
        </View>
      </View>

      {type == "Feed" && <Text style={styles.descLimit}>
        Remaining Limit: {200 - postDesc.length}{" "}
      </Text>}
      {type != "Feed" && <View style={styles.vwMedia}>
        {createPostImgArray?.map((el: any, index: number) => {
          return (
            <View key={`img ${index}`}>
              <AddImageItem
                onPressDel={() => {
                  deleteImage(index)
                }}
                uri={el.uri}
                video={el.type == "video" ? true : false}
                onPress={() => {
                  if (el?.type == "photo") {
                    // Actions.ViewPhoto({
                    //   uri: el?.uri,
                    //   selectedIndex: index,
                    //   isEdit: true,
                    // });
                  } else {
                    // Actions.ViewVideo({ uri: el?.uri });
                  }
                }}
              />
            </View>
          );
        })}

        {createPostImgArray.length < 3 &&
          <AddImageItem
            addIcon
            video={false}
            onPress={() => {
              PickImage()
            }}
            imgstyle={styles.addimage}
          />}


      </View>}
      {
        mediaerror != "" && <Text
          style={
            [styles.error, {
              width: "90%",
              alignSelf: "center",
              fontSize: 14
            }]}
        >
          {mediaerror}
        </Text>
      }
      <CustomButton
        title='Upload'
        buttonStyle={styles.btnupload}
        onPress={() => {
          validate()

        }}

      />
    </LinerGradiantView>
  )
}

export default Create

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    fontFamily: Fonts.normal,
    marginTop: 4,
    color: "red"

  },
  addimage: {

    borderWidth: 1,
    borderColor: "#212121",

  },
  vwMedia: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: Colors.lowblack,
    paddingHorizontal: 20
  },
  descLimit: {
    marginVertical: "2%",
    alignSelf: "flex-end",
    marginRight: 0,
    fontSize: 12,
    fontFamily: Fonts.normal,
    marginTop: 4,
    color: Colors.black,
  },
  btnupload: {

    width: "40%",
    alignSelf: "center",
    borderRadius: 25,
    position: "absolute",
    bottom: "4%"

  },
  row: {
    flexDirection: "row",
    paddingHorizontal: "3%",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    paddingVertical: "3%"
  },
  header: {
    // backgroundColor: "#fff",
    marginTop: 0,
    padding: 10
  },
  headeTitlestyle: {
    color: "#000",
    fontWeight: "600",
    fontSize: normalize(15)
  },
  profileImg: {
    borderRightWidth: 1,
    paddingRight: "3%",
    borderColor: Colors.lowblack
  },
  vwDesc: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderColor: "rgba(255, 255, 255, 0.15)",
    textAlignVertical: "top",
    color: Colors.black,
    fontFamily: Fonts.normal,
  },
})