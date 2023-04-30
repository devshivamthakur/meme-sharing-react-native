import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LinerGradiantView from '../../Component/LinerGradiantView'
import { FlashList } from '@shopify/flash-list'
import { styles } from './HomeStyle'
import VectorIcons from "../../Component/VectorIcons";
import MemoHoc from '../../Component/MemoHoc'
import PostView from './PostView'
import { Colors } from '../../Theme'
import MenuOption from '../../Component/MenuOption'
import withPreventDoubleClick from '../../Component/withPreventDoubleClick'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../Router'
import { useNavigation } from '@react-navigation/native';
type HomeNativeStackNavigationpros = NativeStackNavigationProp<AppStackParamList, 'SocialTab'>

const { width, height } = Dimensions.get("window")

const estimatedItemSize = height
let data = [
  {
    id: 1,
    mediaType: "TEXT",
    mediaurl: null,
    discription: "this is a text field of lenght of size",
  }, {
    id: 2,
    mediaType: "IMAGE",
    mediaurl: "https://miro.medium.com/v2/resize:fit:828/format:webp/1*JJmzyegMLyuB2iiYbzegBg.jpeg",
    discription: null,
  }, {
    id: 3,
    mediaType: "VIDEO",
    mediaurl: "",
    discription: "this is a video field of lenght of size",
  }
]
const TouchableOpacityex = withPreventDoubleClick(TouchableOpacity)
const Home = () => {
  const [MenuOptionvisible, setMenuOptionVisible] = useState(false)
  const navigation = useNavigation<HomeNativeStackNavigationpros>()
  const Header_ = () => {
    return (
      <View
        style={[styles.row, styles.header]}
      >
        <Text
          style={[styles.h1]}
        >Memes</Text>
        <TouchableOpacityex
          style={[styles.roundView]}
          onPress={() => {

            navigation.navigate("Settings")
          }}
        >
          <VectorIcons
            family="AntDesign"
            name="setting"
            size={25}
            color={Colors.lowblack}


          />

        </TouchableOpacityex>
      </View>
    )

  }
  const closeMenu = () => {
    setMenuOptionVisible(false);
  }
  const openMenu = () => {
    setMenuOptionVisible(true);
  }
  const reportpressed = () => {
    setMenuOptionVisible(false);
  }
  const blockpressed = () => {
    setMenuOptionVisible(false);
  }
  return (
    <LinerGradiantView>
      <FlashList
        data={data}
        estimatedItemSize={estimatedItemSize}
        ListHeaderComponent={Header_()}
        renderItem={({ item }) => (
          <MemoHoc>
            <PostView
              item={item}
              MenuPress={openMenu}
            />
          </MemoHoc>
        )}
      />
      {MenuOptionvisible && <MenuOption
        visible={MenuOptionvisible}
        closepressed={closeMenu}
        reportpressed={reportpressed}
        blockpressed={blockpressed}


      />}


    </LinerGradiantView>

  )
}

export default Home