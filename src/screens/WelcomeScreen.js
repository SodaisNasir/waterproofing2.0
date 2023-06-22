import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../components/Colors';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {Font} from '../constants/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {slider_data} from '../redux/actions/AuthActionss';
import Loading from '../components/Loader/Loading';
import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DETAILS, USER_ID} from '../redux/CartItem';

const TitleScreen = () => {
  const navigation = useNavigation();
  const sliderData = useSelector(state => state.slider_data);
  const loading = useSelector(state => state.is_loading);
  const [loading1, setLoading1] = useState(false);
  const carouselItems = useState([
    {
      key: 1,
      title: 'Title 1',
      text: 'Description.\nSay something cool',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    },
  ]);

  const dispatch = useDispatch();
  const onsubmit = async data => {
    dispatch(slider_data());
  };
  useEffect(() => {
    onsubmit();
  }, []);

  const loginStatus = useCallback(async () => {
    setLoading1(true);
    dispatch({
      type: USER_ID,
      payload: 'user_logout',
    });
    setLoading1(false);
  }, []);

  return loading1 || loading ? (
    <Loading />
  ) : (
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
          height: verticalScale(60),
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: verticalScale(60),
        }}
      />

      <StatusBar backgroundColor={Colors.trayColor} barStyle="light-content" />

      <LinearGradient colors={['#2879D4', '#E12C33']} style={styles.box}>
        <View
          style={{
            height: scale(220),
          }}>
          <Swiper
            style={{
              alignItems: 'center',
            }}
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,.2)',
                  width: moderateScale(10),
                  height: moderateScale(10),
                  borderRadius: moderateScale(5),
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: 'lightgrey',
                  width: moderateScale(10),
                  height: moderateScale(10),
                  borderRadius: moderateScale(5),
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            showsButtons={false}>
            {sliderData.map((item, index) => {
              return (
                <View key={index} style={styles.slide1}>
                  <Text style={styles.text}>{item.title}</Text>
                  <Text style={styles.subText}>{item.description}</Text>
                </View>
              );
            })}
          </Swiper>
        </View>
      </LinearGradient>
      <View>
        <LinearGradient colors={['#327BCD', '#073162']} style={styles.button}>
          <TouchableOpacity onPress={loginStatus} activeOpacity={0.6}>
            <Text style={styles.btnText}>GET STARTED</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View
        style={[
          styles.button,
          {bottom: 0, width: '100%', justifyContent: 'center'},
        ]}>
        <Text style={styles.contact}>info@areawidewaterproofing.com</Text>
        <Text style={styles.contact}>708-274-7467</Text>
      </View>
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

  box: {
    width: scale(300),
    height: verticalScale(360),
    alignSelf: 'center',
    marginTop: moderateScale(160),
    borderRadius: moderateScale(40),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: scale(220),
    height: verticalScale(60),
    borderRadius: moderateScale(20),
    position: 'absolute',
    alignSelf: 'center',
    marginTop: moderateScale(400),
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    fontSize: moderateScale(18),
    // fontWeight: 'bold',
    color: Colors.white,
    fontFamily: Font.Lato700,
  },
  contact: {
    fontSize: moderateScale(16),
    // fontWeight: 'bold',
    color: Colors.white,
    fontFamily: Font.Lato700,
    width: '100%',
    textAlign: 'center',
  },

  slide1: {
    height: verticalScale(200),
    width: '100%',
  },

  text: {
    color: Colors.white,
    fontSize: moderateScale(30),
    textAlign: 'center',
    marginHorizontal: moderateScale(30),
    fontFamily: Font.Lato700,
  },

  subText: {
    color: Colors.white,
    margin: moderateScale(10),
    textAlign: 'center',
    fontFamily: Font.Lato400,
  },
});

export default TitleScreen;
