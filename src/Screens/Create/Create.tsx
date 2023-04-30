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
type CreateScreenRouteProp = RouteProp<AppStackParamList, 'Create'>;

type imagerray = {
  type: string,
  uri: string
}

type Props = {
  navigation: UserNavigationProp<'Create'>;
  route: CreateScreenRouteProp
};
const Create = ({ navigation, route }: Props) => {
  const [postDesc, setPostDesc] = useState("")
  const [createPostImgArray, setcreatePostImgArray] = useState<imagerray[]>([])
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
    let copy = [...createPostImgArray]
    copy.push({
      type: type,
      uri: response.path
    })
    setcreatePostImgArray(copy)


  }
  const deleteImage = (index: number) => {
    let copy = [...createPostImgArray]
    copy.splice(index, 1)
    setcreatePostImgArray(copy)

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
          <Image
            resizeMode={"cover"}
            style={{
              width: 45,
              height: 45,
              borderRadius: 45 / 2
            }}
            source={{ uri: images.dummyImage }}
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

            }}
            style={styles.vwDesc}

          />}
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
      <CustomButton
        title='Upload'
        buttonStyle={styles.btnupload}

      />
    </LinerGradiantView>
  )
}

export default Create

const styles = StyleSheet.create({
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