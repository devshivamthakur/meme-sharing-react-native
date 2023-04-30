import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Fonts, Colors, images } from "../Theme"
import CustomButton from "./CustomButton";
interface MyCustomAlertprops {
  onRequestClose: (param: string | any) => void;
  isVisible?: boolean,
  cross?: string,
  from?: string,
  alertImage?: "" | string,
  error?: '' | null | string,
  errorTitle?: '' | string,
  noVisible?: false | boolean,
  noBtnText?: '' | string,
  buttonText?: '' | string,
  alertVisible?: false | boolean,

}
export const MyCustomAlert = (props: MyCustomAlertprops) => {
  const onButtonPress = (param: string) => {
    props.onRequestClose(param);
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={props.isVisible}
        transparent={true}
        onRequestClose={props.onRequestClose}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Colors.buttonTextShadowColor,
            },
          ]}
        />
        <View
          style={{
            backgroundColor: Colors.buttonTextShadowColor,
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <LinearGradient
            style={{
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "red",
              marginHorizontal: 22,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 3.84,
              elevation: 15,
              borderRadius: 15,
              overflow: "hidden",
              
            }}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            colors={['#ec9bcf', '#f1b9b7', '#f1b9b7', '#d6cced']}
          >
            {(props.cross != "" && props.cross != undefined) ||
              props.error == "Do you want to Logout?" ? (
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  marginTop: 15,
                  marginRight: 15,
                }}
                onPress={props.onRequestClose}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    height: 15,
                    width: 15,
                    tintColor: "rgba(0, 0, 0, 0.6)",
                  }}
                  source={images.close_icon}
                ></Image>
              </TouchableOpacity>
            ) : null}


            <View style={{ marginTop: props.from != "BlockUser" ? 26 : 30, marginLeft: props.from == "ChangeLoginPin" ? 10 : 0 }}>
              <Image
                resizeMode="cover"
                style={{
                  alignSelf: "center",
                  height: 45,
                  width: 45,
                }}
                source={
                  props.alertImage == "" ? images.applogo : props.alertImage
                }
              ></Image>
            </View>
            <Text
              style={{
                fontSize: props.error == "Do you want to Logout?" ? 22 : 18,
                alignSelf: "center",
                textAlign: 'center',
                color: "#fff",
                marginLeft: 5,
                fontFamily: Fonts.medium,
                marginTop: props.from == "ChangeLoginPin" ? 18 : 5,
                fontWeight: "700",
              }}
            >
              {props.errorTitle}
            </Text>
            {props.error != null && (
              <Text
                style={{
                  fontSize: 14,
                  alignSelf: "center",
                  color: "#000",
                  fontFamily: Fonts.normal,
                  marginTop: 9,
                  textAlign: "center",
                  marginHorizontal: 8,
                  width: props.from != "BlockUser" ? "90%" : "60%",
                }}
              >
                {props.error}
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: props.from != "BlockUser" ? 0 : 40,
                marginTop: 5,
              }}
            >
              {props.noVisible == false && props.buttonText != null ? (
                <LinearGradient
                  style={[styles.buttonStyle]}
                  colors={[Colors.orange, Colors.darkOrange]}
                  angle={100}
                >
                  <TouchableOpacity
                    style={[styles.yesButton]}
                    onPress={() => {
                      onButtonPress("no");
                    }}
                  >
                    <Text style={[styles.okButtonText,]}>{props.buttonText}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <CustomButton
                title={props.buttonText}
                buttonStyle={[
                  styles.closeButton,
                  {
                    width: props.from != "BlockUser" ? 130 : 100,
                  },
                ]}
                onPress={() => {
                  onButtonPress("yes");
                }}
                />
              )}

              {props.noVisible && (
                <CustomButton
                disableLinear={true}
                  title={props.noBtnText}
                  buttonStyle={[
                    styles.closeButton,
                    {
                      width: props.from != "BlockUser" ? 130 : 100,
                      borderWidth:1
                    },
                  ]}
                  onPress={() => {
                    onButtonPress("no");
                  }}
                />
              )}
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    position: "relative",
    maxHeight: 54,
    justifyContent: "center",
    borderRadius: 27,
    marginHorizontal: 15,
    zIndex: 2,

    marginTop: 31,
    marginBottom: 23,
    width: 130,
    height: 37,
    alignSelf: "center",
  },
  closeButton: {
    marginVertical: 20,
    width: 120,
    height: 40,
    // paddingHorizontal:15,
    alignSelf: "center",
    borderRadius:130/4,
    marginLeft:10


  },
  noButton: {
    marginLeft: 12,
    width: 130,
    height: 40,
    borderRadius: 27,
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1,
    marginVertical: 20,
    justifyContent: "center",
  },
  yesButton: {
    width: 130,
    height: 40,
    marginVertical: 20,
    justifyContent: "center",
  },

  noButtonText: {
    fontFamily: Fonts.medium,
    color: Colors.black,
    fontSize: 15,
    textAlign: "center",
  },
  okButtonText: {
    fontFamily: Fonts.medium,
    color: Colors.white,
    fontSize: 15,
    textAlign: "center",
  },
});

