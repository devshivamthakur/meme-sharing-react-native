import { View, ScrollView, Dimensions } from 'react-native'
import React,{memo} from 'react'
import { Media } from '../../Redux/Sliceinterface'
import FastImage from 'react-native-fast-image'
import { IMAGEURL } from '../../Apiendpoints'
const { width, height } = Dimensions.get("window")
interface PostImageprops {
    media?: Media[],
    onChangeActiveindex:(index:number)=>void
    
}
const PostImage = ({ media ,onChangeActiveindex}: PostImageprops) => {
    const handleScroll = (event:any) => {
        const { contentOffset } = event.nativeEvent;
        const index = Math.round(contentOffset.x / width * 0.87); // ITEM_WIDTH is the width of each item
        onChangeActiveindex(index)
      };
    
    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
               
            >
                {
                    media?.map((item, index) => {
                        return (
                            <View
                                key={index}
                            >
                                <FastImage
                                    style={{
                                        width: width * 0.9,
                                        height: height * 0.50,
                                        overflow: "hidden",
                                        borderRadius: 10

                                    }}
                                    resizeMode='contain'
                                    source={{ uri: IMAGEURL + item.file }}

                                />
                            </View>
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}

export default memo(PostImage)