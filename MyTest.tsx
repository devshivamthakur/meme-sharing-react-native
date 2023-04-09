import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
const baseUrl = 'https://realestateview.com.au';

const Infinitescroll = () => {
    const [HouseData, sethousedata] = useState([]);
    const [page, setpage] = useState(1);
    const [loading, setLoading] = useState(false);


    const getuser = (pageno: number) => {
        setLoading(true);
        axios({
            method: 'get',
            url: `${baseUrl}/api/legacy/mobile/search?limit=50&page=` + pageno,


            headers: {
                'X-REV-APIKEY': '46F42C32-1294-4D13-8B54-EB183BC04FBD',
                'Cookie': 'FLASH=%7B%7D',
            }


        })

            .then((response: any) => {
                console.log(response.data.data);
                setLoading(false);
                
                if (response.data.data.length > 0) {
                    sethousedata([...HouseData,...response.data.data]);
                    setpage(pageno+1)

                }
               
            })
            .catch(function (error: any) {
                setLoading(false);
                console.log(error);
            });

    }
    useEffect(() => {
        getuser(1);
    }, [])
    return (
        <View style={{ flex: 1 }} >
            <FlatList

                data={HouseData}
                onEndReached={() => {

                    getuser(page)
                }}
                onEndReachedThreshold={1}


                renderItem={({ item }) => {

                    return (
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{item.BathRooms + ' bathrooms,' + item.Bedrooms + ' bedrooms for sale in:'}</Text>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
            {loading ? (
                <View
                    style={{
                        width: '100%',
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <Text>Loading...</Text>
                    <ActivityIndicator />

                </View>
            ) : null}


        </View>


    );


}

export default Infinitescroll