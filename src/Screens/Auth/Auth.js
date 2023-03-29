import { Image, Animated, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import { Colors, Fonts, images } from '../../Theme'
import withPreventDoubleClick from '../../Component/withPreventDoubleClick'
import { normalize } from '../../../Normalize'
const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity)

const Auth = (props) => {
  const [fadeAnim] = React.useState(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }
    ).start();
  }, [])
  return (
    <SafeAreaView
      style={styles.main}
    >
      <Animated.Image
        source={images.applogo}
        style={[styles.logo,{
          opacity:fadeAnim
        }]}

      />
      <Animated.Text
      style={[styles.h1,{
        marginTop:"10%",
        opacity:fadeAnim
      }]}
      adjustsFontSizeToFit={true}

      >Welcome to the </Animated.Text>
      <Text
      style={styles.h1}
      adjustsFontSizeToFit={true}
      >
        My App
      </Text>
      <TouchableOpacityEx
      style={[styles.rowbtn,{
        marginTop:"25%"
      }]}
      onPress={()=>{
        props.navigation.navigate("Filluserinfo")
      }}
      >
        <Image
        source={images.metamask}
        style={styles.icon}
        />
        <Text
        style={styles.btntext}
        adjustsFontSizeToFit={true}
        >
          Connect with Metamask
        </Text>
        
      </TouchableOpacityEx>
      <TouchableOpacityEx
      style={[styles.rowbtn,{
        marginTop:"5%"
      }]}
      >
        <Image
        source={images.google}
        style={styles.icon}
        />
        <Text
        style={styles.btntext}
        adjustsFontSizeToFit={true}
        >
          Connect with Google
        </Text>
        
      </TouchableOpacityEx>
    </SafeAreaView>
  )
}

export default Auth


const styles = StyleSheet.create({
  btntext:{
    fontSize:normalize(16),
    color:Colors.mainbg,
    fontFamily:Fonts.normal,
    fontWeight:"600",
    marginLeft:"5%"

  },
  icon:{
    width:30,
    height:30,
    resizeMode:"contain",

  },
  rowbtn:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:Colors.white,
    borderRadius:10,
    padding:"5%",
    width:"90%",
    alignSelf:"center",
    paddingLeft:"10%"
    // justifyContent:"center"
   

  },
  main: {
    flex: 1,
    backgroundColor: Colors.mainbg,
    padding:"5%"
  },
  logo:{
    width:90,
    height:90,
    resizeMode:"contain",
    alignSelf:"center"

  },
  h1:{
    fontSize:normalize(34),
    color:Colors.white,
    fontFamily:Fonts.normal,
    fontWeight:"700"
  }


})