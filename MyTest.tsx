import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const MyTest = () => {
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const apiCalling = (text:string) => {
    Axios({
      method: "get",
      url: `https://www.realestateview.com.au/api/pubui/location/search/?searchText=${text}`,
      headers: {

      }
    }).then((response) => {
      console.log(response.data.data)
      if (response.status == 200) {
        setData(response.data.data)

      }
    }).catch((err) => {
      console.log(err)

    })
  }

  useEffect(() => {
  }, [])
  const renderItem = (item: any, index: number) => {
    return (
      <Text>
        {item.displayText}
      </Text>
    )
  }
  const SearchHeader = () => {
    return (
      <View>
        <TextInput
          style={{
            width: '90%',
            borderWidth: 1,
            padding: 15,
            borderRadius: 5,
            alignSelf: "center",
            marginTop: 10



          }}
          placeholder="Search by suburb, postcode or area"
          onChangeText={(text) => {
            if (text.length > 2) {
              apiCalling(text)
            } else {
              setData([])
            }

          }}

        />

      </View>
    )
  }
  const RenderSearh = ()=> {

    return (
      <ScrollView style={styles.vwUserList} scrollEnabled={true}>
        {data
          .map((one: any, index) => {
            return (renderItem(one, index))
          })}
      </ScrollView>
    );
  };

  return (
    <View
      style={{
        flex: 1,

      }}
    >

      {
        SearchHeader()
      }
      {
        RenderSearh()
      }

    </View>
  )
}

export default MyTest

const styles = StyleSheet.create({
  vwUserList: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#fff",
    position: "absolute",
    width: "100%",
    maxHeight: 250,
    top: 180,
    marginVertical: 10,
    borderRadius: 16,
    shadowRadius: 16,
    shadowColor: "#000",
    elevation: 2,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    zIndex: 999,
  },
})