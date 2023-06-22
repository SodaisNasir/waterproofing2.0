import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../Colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../constants/Fonts';

const CardDashboard = ({title, style, number, colorone, colortwo, display}) => {
  return (
    <LinearGradient
      style={[styles.cardContainer]}
      colors={[colorone, colortwo]}
      useAngle={true}
      angle={45}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.number}>{number}</Text>
    </LinearGradient>
  );
};

export default CardDashboard;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 40,
    marginTop: verticalScale(20),
    height: verticalScale(80),
    justifyContent: 'center',
    borderRadius: 15,
    
  },
  text: {
    color: Colors.white,
    fontFamily: Font.Lato700,

    fontSize: moderateScale(20),
    marginLeft: verticalScale(15),
  },
  number: {
    color: Colors.white,
    fontSize: moderateScale(30),
    fontFamily: Font.Lato700,
    // fontWeight: '700',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: verticalScale(15),
  },
});
