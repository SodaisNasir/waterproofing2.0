import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Colors from './Colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Font } from '../constants/Fonts';

const CustomButton = ({ title, onPress, style, loading, arrow, style1 }) => {
  return loading ?
    <View activeOpacity={0.8}>
      <LinearGradient
        style={[styles.container, style, { opacity: 0.5 }]}
        colors={[Colors.btnColor1, Colors.btnColor2]}
        useAngle={true}
        angle={45}>
        <Text style={styles.text}>{title}</Text>
        <ActivityIndicator style={{ marginHorizontal: 20 }} size={'small'} color={'white'} />
      </LinearGradient>
    </View> :
    (
      <>
        {arrow ?
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <LinearGradient
              style={[styles.container, style1, { height: verticalScale(45), marginTop: verticalScale(10), justifyContent: 'center' }]}
              colors={[Colors.btnColor1, Colors.btnColor2]}
              useAngle={true}
              angle={45}>
              <Text style={[styles.text, { marginLeft: 0 }]}>{title}</Text>
            </LinearGradient>
          </TouchableOpacity>

          :
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <LinearGradient
              style={[styles.container, style]}
              colors={[Colors.btnColor1, Colors.btnColor2]}
              useAngle={true}
              angle={45}>
              <Text style={styles.text}>{title}</Text>

              <Image
                source={require('./images/arrowright.png')}
                style={styles.image}
              />
            </LinearGradient>
          </TouchableOpacity>
        }

      </>

    );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    marginHorizontal: scale(10),
    height: verticalScale(50),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(15),
    justifyContent: 'space-between',
    shadowColor: Colors.pink,
    elevation: 10,
    shadowRadius: moderateScale(15),
    shadowOffset: { width: 1, height: 2 },
  },
  text: {
    fontSize: moderateScale(20),
    color: Colors.white,
    letterSpacing: 1,
    // fontWeight: '700',
    fontFamily: Font.Lato700,
    marginLeft: scale(25),
  },

  image: {
    width: scale(30),
    height: scale(28),
    resizeMode: 'contain',
    marginRight: scale(25),
  },
});

export default CustomButton;
