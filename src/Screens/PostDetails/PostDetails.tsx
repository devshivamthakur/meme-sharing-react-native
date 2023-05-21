import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import LinerGradiantView from '../../Component/LinerGradiantView'
import MyHeader from '../../Component/MyHeader'
import { normalize } from '../../../Normalize'
import UserNavigationProp from '../../Component/UserNavigationProp'
import PostView from '../Home/PostView'
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Router';
const height = Dimensions.get("window").height
type CreateScreenRouteProp = RouteProp<AppStackParamList, 'PostDetails'>;

interface Props {
  navigation: UserNavigationProp<"PostDetails">,
  route: CreateScreenRouteProp
}
const PostDetails = (props: Props) => {
  return (
    <LinerGradiantView>
      <MyHeader
        title={"Post Details"}
        titlestyle={styles.titlestyle}
        leftPress={() => {
          props.navigation.goBack()
        }}
        style={{

        }}

      />
      <View
        style={{
          maxHeight: height * 0.70,
          minHeight: height * 0.45,
        }}
      >

        <PostView
          index={0}
          item={props.route.params}
          hidemenu_btn={true}

        />
      </View>

    </LinerGradiantView>
  )
}

export default PostDetails

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titlestyle: {
    fontSize: normalize(18),
    fontWeight: "600"
  },
})