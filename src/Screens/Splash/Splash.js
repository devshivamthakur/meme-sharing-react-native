import { View, Image,Text } from 'react-native'
import React,{useEffect} from 'react'
import { Colors, images } from '../../Theme'

const Splash = (props) => {
    useEffect(() => {
      let timer = setTimeout(() => {
        props.navigation.navigate('Auth')
        }, 3000)
    
      return () => {
        clearTimeout(timer)
        
      }
    }, [])
    
  return (
    <View
    style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainbg,

    }}
    >
      <Image
      source={images.applogo}
      style={{
        width: 200,
        height: 200,
        alignSelf: 'center',

      }}
      />
      <Text
      style={{
        fontSize: 30,
        color: Colors.white,
        fontFamily: 'Poppins-Bold',
        fontWeight: '600',
      }}
      >
        App Name
      </Text>
    </View>
  )
}

export default Splash