import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

const ImageLogo = () => {
  return (
    <Image
      resizeMode="contain"
      style={styles.image}
      source={require('../components/images/logocolor.png')}
    />
  );
};

export default ImageLogo;

const styles = StyleSheet.create({
  image: {
    height: verticalScale(200),
    // backgroundColor: 'blue',
    alignSelf: 'center',
    aspectRatio: 1 / 1,
  },
});
