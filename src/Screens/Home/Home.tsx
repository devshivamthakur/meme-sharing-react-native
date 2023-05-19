import { ViewToken, View, Text, Dimensions, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useMemo, useState, useCallback } from 'react'
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
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks'
import { BlockUserAsync, Get_post_list_thunk } from "../../Redux/Actions/Postinfoactions"
import { UserPost } from '../../Redux/Sliceinterface'
import { useSharedValue } from 'react-native-reanimated';
import { MyCustomAlert } from '../../Component/MyCustomAlert'
import { updatemodalloader } from '../../Redux/Reducers/UserinfoSlice'

type HomeNativeStackNavigationpros = NativeStackNavigationProp<AppStackParamList, 'SocialTab'>

const { height } = Dimensions.get("window")

const estimatedItemSize = height * 0.61

const TouchableOpacityex = withPreventDoubleClick(TouchableOpacity)
let alertmodal_dummy={
  isVisible: false,
  error: "",
  errorTitle: "",
  alertImage: "",
  buttonText: "",
  noVisible: false,
  noBtnText: "",
  isFrom: ""
}
const Home = () => {

  const PostList = useAppSelector(state => state.postinfo.Postlist)
  const PostinfoSlice = useAppSelector(state => state.postinfo)
  const dispatch = useAppDispatch()
  const [MenuOptionvisible, setMenuOptionVisible] = useState(false)
  const [selected_index, setselected_index] = useState(0)
  const navigation = useNavigation<HomeNativeStackNavigationpros>()
  const [alertmodal, setAlertmodal] = useState(alertmodal_dummy);
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
  const openMenu = (selected_index: number) => {
    setMenuOptionVisible(true);
    setselected_index(selected_index)

  }
  const reportpressed = () => {
    setMenuOptionVisible(false);

  }
  const blockpressed = () => {
    setMenuOptionVisible(false);
    setAlertmodal({
      isVisible: true,
      error: "Are you sure you want to block this user?",
      errorTitle: "Block User",
      alertImage: "",
      buttonText: "Yes",
      noVisible: true,
      noBtnText: "No",
      isFrom: "blockuser"
    });



  }
  const PostList_ = useMemo(() => {
    return PostList
  }, [PostList])
  useEffect(() => {
    dispatch(Get_post_list_thunk(PostinfoSlice.pageno))
  }, [])
  const renderPost = useCallback(({ item, index }: {
    item: UserPost,
    index: number
  }) => {
    return (
      <MemoHoc>
        <PostView
          item={item}
          MenuPress={openMenu}
          index={index}
        />
      </MemoHoc>
    );
  }, []);
  const onAlertClick = (param: string) => {
    let { isFrom } = alertmodal;
    setAlertmodal(alertmodal_dummy);
    if (isFrom == "blockuser" && param == "yes") {

      BlockUSerAPi_()

    }
  }
  const BlockUSerAPi_ = () => {
    let bodydata = {
      blocked_user: PostList_[selected_index].user.id
    }

    dispatch(BlockUserAsync(bodydata))




  }
  return (
    <LinerGradiantView>
      <FlashList
        data={PostList_}
        estimatedItemSize={estimatedItemSize}
        ListHeaderComponent={Header_()}
        renderItem={renderPost}
        refreshControl={
          <RefreshControl
            refreshing={PostinfoSlice.loading}
            onRefresh={() => {
              dispatch(Get_post_list_thunk(1))
            }}
          />

        }
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          PostinfoSlice.loading ? <ActivityIndicator

            size="large"
            color={"blue"}
          /> : null

        }
       

        onEndReached={() => {
          if (!PostinfoSlice.loading && PostinfoSlice.Postlist.length > 0) {
            dispatch(Get_post_list_thunk(PostinfoSlice.pageno))
          }
        }}
        getItemType={(item: UserPost, index) => {
          return item.post_type
        }}


      />
      {MenuOptionvisible && <MenuOption
        visible={MenuOptionvisible}
        closepressed={closeMenu}
        reportpressed={reportpressed}
        blockpressed={blockpressed}


      />}

      {alertmodal.isVisible == true && (
        <MyCustomAlert
          alertImage={alertmodal.alertImage}
          alertVisible={alertmodal.isVisible}
          noVisible={alertmodal.noVisible}
          onRequestClose={(param) => onAlertClick(param)}
          error={alertmodal.error}
          errorTitle={alertmodal.errorTitle}
          buttonText={alertmodal.buttonText}
          noBtnText={alertmodal.noBtnText}
        />
      )}


    </LinerGradiantView>

  )
}

export default Home