import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../components/Colors';
import {useNavigation} from '@react-navigation/native';

const TitleScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('welcome');
    }, 3000);
  }, []);

  return (
    <LinearGradient
      colors={['#302DDE', '#3633CA', '#EC42A0']}
      style={styles.container}>
      <Image
        source={require('../components/images/shade.png')}
        style={{
          width: '100%',
          height: verticalScale(300),
          resizeMode: 'cover',
          position: 'absolute',
        }}
      />

      <Image
        source={require('../components/images/logo.png')}
        style={{
          width: '100%',
          height: verticalScale(100),
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: verticalScale(220),
        }}
      />
      <Image
        source={require('../components/images/drops.png')}
        style={{
          width: scale(60),
          height: verticalScale(60),
          resizeMode: 'contain',
          alignSelf: 'flex-end',
          marginTop: verticalScale(10),
          marginRight: scale(50),
          marginTop: scale(-5),
        }}
      />

      <Image
        style={styles.house}
        source={require('../components/images/house.png')}
      />

      <StatusBar backgroundColor={Colors.trayColor} barStyle="light-content" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  house: {
    alignSelf: 'center',
    width: scale(300),
    height: verticalScale(200),
    resizeMode: 'contain',
    marginTop: verticalScale(80),
  },
});

export default TitleScreen;
