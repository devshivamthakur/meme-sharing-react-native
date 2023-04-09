import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts, Colors, images as Images } from '../Theme';
import * as Utils from '../Utils'
import VideoPlayer from 'react-native-video';
import withPreventDoubleClick from './withPreventDoubleClick';

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity);
type AddImageItemprops = {
  addIcon?: boolean,
  onPress?: () => void,
  imgstyle?: object,
  video?: boolean,
  uri?: string,
  onPressDel?: () => void,
}
const AddImageItem = (props: AddImageItemprops) => {
  return (
    <TouchableOpacityEx style={[styles.main, props.imgstyle]} onPress={props.onPress} activeOpacity={0.5}>
      {props.addIcon ?
        <Image source={Images.add_picture} />
        : (!props.video ?
          <Image style={styles.imgVw} resizeMode='cover' source={{ uri: props.uri }} />
          : <VideoPlayer source={{ uri: props.uri }}
            style={styles.imgVw}
            paused={true}

            resizeMode={'cover'}
            playInBackground={false}

          />)}
      {!props.addIcon && <TouchableOpacityEx style={styles.btnClose} onPress={props.onPressDel} activeOpacity={0.5}>
        <Image style={styles.imgClose} source={Images.close} />
      </TouchableOpacityEx>}
    </TouchableOpacityEx>
  );
};

const styles = StyleSheet.create({
  main: {
    width: 80,
    height: 80,
    marginTop: 16,
    marginRight: 10,
    backgroundColor: "transparent",
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderStyle: 'dashed'
  },
  imgVw: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.appGraycolor,
    borderRadius: 16
  },
  btnClose: {
    position: 'absolute',
    right: -16,
    top: -16
  },
  imgClose: {
    width: 22,
    height: 22,
    tintColor: Colors.white,
    backgroundColor: 'red',
    borderRadius: 11,
    margin: 8
  }
});

export { AddImageItem };
