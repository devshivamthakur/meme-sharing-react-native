import { View, Text, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const Test = () => {
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const apiCalling = (text) => {
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

    })
  }

  useEffect(() => {
  }, [])
  const renderItem = ({ item, index }) => {
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
            marginTop:10



          }}
          placeholder="Search by suburb, postcode or area"
          onChangeText={(text)=>{
            if(text.length>2){
              apiCalling(text)
            }else{
              setData([])
            }

          }}

        />

      </View>
    )
  }
  return (
    <View
      style={{
        flex: 1,

      }}
    >
      <FlatList
        ListHeaderComponent={SearchHeader()}
        data={data}
        renderItem={renderItem}

      />
    </View>
  )
}

export default Test