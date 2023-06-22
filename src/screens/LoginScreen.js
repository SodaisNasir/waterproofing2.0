import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../components/Colors';
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import { useSelector, useDispatch } from 'react-redux';
import { IS_LOADING, IS_SIGN_IN } from '../redux/CartItem';
import { Font } from '../constants/Fonts';
import { useForm } from 'react-hook-form';
import { get_notification, sign_in } from '../redux/actions/AuthActionss';
import NotificationModal from '../components/modals/NotificationModal';
import { email_regex } from '../constants/Regex';
import Validation from '../components/error/Validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchID from 'react-native-touch-id';



const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const LoginScreen = () => {
  return (
    <LinearGradient
      colors={['#302DDE', '#3633CA', '#EC42A0']}
      style={styles.container}>
      <StatusBar backgroundColor={Colors.trayColor} barStyle="light-content" />
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
          height: verticalScale(70),
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: verticalScale(60),
        }}
      />

      <LoginUI />
    </LinearGradient>
  );
};


const LoginUI = () => {

  // const isSignIn = value => dispatch({type: IS_SIGN_IN, payload: value});
  // const onsubmit = value => {
  //   dispatch({ type: IS_SIGN_IN, payload: value });
  // };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });
  const navigation = useNavigation();

  const data = useSelector(state => state.user_details);
  const loading = useSelector(state => state.is_loading);

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const token = useSelector(state => state.notification_token);

  const DeviceToken = data => {
    dispatch(get_notification());
  };

  const [is_faceID, setIsFaceID] = useState();


  const getCheckFaceID = async () => {
    let faceCheck = await AsyncStorage.getItem('face_id');
    console.log("ZZZ : ", faceCheck);
    setIsFaceID(faceCheck);
  };

  const optionalConfigObject = {
    unifiedErrors: false,// use unified error messages (default false)
    passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
  }

  useEffect(() => {
    getCheckFaceID();
    if (!token) {
      DeviceToken();
    }
    dispatch({ type: IS_LOADING, payload: false });



  }, []);
  const onsubmit = async data => {
    const email = data.email;
    const password = data.password;
    dispatch(sign_in(email, password, setVisible, token));
  };

  const AuthWithFaceId = async () => {
    let data = await AsyncStorage.getItem('user_details');
    let JsonData = JSON.parse(data);
    let email = JsonData.email;
    let password = JsonData.password;
    dispatch(sign_in(email, password, setVisible, token));
  }


  const authTouchId = async () => {
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };


    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
          TouchID.authenticate('Authenticate with your Face', optionalConfigObject)
            .then(success => {
              AuthWithFaceId();
            })
            .catch(error => {
              console.log('Authentication Failed');
            });
        } else if (biometryType === 'TouchID') {
          console.log('TouchID is supported.');
          TouchID.authenticate('Authenticate with your Fingerprint', optionalConfigObject)
            .then(success => {
              AuthWithFaceId();
              // alert('Authenticated Fingerprint Successfully',);
            })
            .catch(error => {
              console.log('Authentication Failed');
            });

        } else {
          console.log('Auth is supported.');
          TouchID.authenticate('Authenticate with your Fingerprint', optionalConfigObject)
            .then(success => {
              AuthWithFaceId();
              // alert('Authenticated Fingerprint Successfully',);
            })
            .catch(error => {
              console.log('Authentication Failed');
            });
        }
      })
      .catch(error => {
        // Failure code
        alert('Your device is not enrolled with face or touch id. Please enable it from your device settings then try again!');
        console.log("Errorz : ", error);
      });


  }



  return (
    <View
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.whole}>
      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.subheading}>
            Please, kindly use your email and password to login.
          </Text>
          <InputField
            name="email"
            defaultValue=""
            control={control}
            style={styles.InputField}
            textStyle={styles.textInputField}
            rules={{
              required: 'email is required',
              pattern: {
                value: email_regex,
                message: 'Enter a valid email',
              },
            }}
            image={require('../components/images/user.png')}
            placeholder={'Email'}
          />
          {errors.email && <Validation title={errors.email.message} />}
          <InputField
            name="password"
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: ' Password too short min length is 8',
              },
              maxLength: {
                value: 16,
                message: 'Password maximum length is 16',
              },
            }}
            control={control}
            image={require('../components/images/lock.png')}
            placeholder={'Password'}
            secureTextEntry={true}
          />
          {errors.password && <Validation title={errors.password.message} />}

          <CustomButton
            title={'LOGIN'}
            onPress={handleSubmit(onsubmit)}
            loading={loading}
          />

          <Pressable onPress={() => navigation.navigate('resetpassword')}>
            <Text style={styles.fp}>Forgot Password?</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('resetemail')}>
            <Text style={styles.fp2}>Forgot Email?</Text>
          </Pressable>

          <Text style={styles.acc}>Don&rsquo;t have an account?</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('createaccount')}
            activeOpacity={0.7}>
            <LinearGradient
              colors={[Colors.pink1, Colors.pink2]}
              style={styles.createAccount}>
              <Text
                style={{
                  color: 'red',
                  fontSize: moderateScale(15),
                  // fontWeight: '600',
                  fontFamily: Font.Lato700,
                }}>
                CREATE AN ACCOUNT
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {is_faceID == 'true'
            ?
            <TouchableOpacity
              onPress={authTouchId}
              activeOpacity={0.7}>
              <LinearGradient
                colors={[Colors.pink1, Colors.pink2]}
                style={styles.createFaceid}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: moderateScale(15),
                    // fontWeight: '600',
                    fontFamily: Font.Lato700,
                  }}>
                  {Platform.OS == "ios" ? 'SIGN IN WITH FACE ID' : 'SIGN IN WITH TOUCH ID'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            :
            null

          }
          {Platform.OS === 'android' ? (
            <View
              style={{
                width: '100%',
                height: verticalScale(80),
              }}></View>
          ) : <View
            style={{
              width: '100%',
              height: verticalScale(50),
            }}></View>}
        </ScrollView>
      </View>
      <NotificationModal
        title={data?.message}
        visible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        state={data?.status}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  whole: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'flex-end',
  },

  card: {
    width: '100%',
    height:
      Platform.OS === 'android' ? windowHeight * 0.75 : windowHeight * 0.7,
    backgroundColor: Colors.white,
    borderTopRightRadius: scale(40),
    borderTopLeftRadius: scale(40),
    paddingLeft: scale(20),
    paddingRight: scale(20),
    paddingTop: scale(20),
  },

  heading: {
    color: Colors.black,
    fontSize: moderateScale(28),
    letterSpacing: 0.4,
    fontFamily: Font.Lato700,
  },
  subheading: {
    color: Colors.black,
    fontSize: moderateScale(13),
    marginVertical: verticalScale(10),
    fontFamily: Font.Lato400,
  },
  InputField: {
    paddingBottom: Platform.OS == 'ios' ? verticalScale(10) : verticalScale(5),
  },
  fp: {
    color: Colors.btnColor1,
    fontSize: moderateScale(16),
    alignSelf: 'center',
    marginTop: scale(15),
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
    // fontWeight: '500',
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  fp2: {
    color: Colors.btnColor1,
    fontSize: moderateScale(16),
    alignSelf: 'center',
    marginVertical: verticalScale(10),
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
    // fontWeight: '500',
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  acc: {
    alignSelf: 'center',
    color: Colors.lightBlack,
    fontSize: moderateScale(15),
    fontFamily: Font.Lato400,
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    // marginLeft: 25,
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },

  createAccount: {
    height: verticalScale(55),
    borderRadius: moderateScale(25),
    marginVertical: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  createFaceid: {
    height: verticalScale(55),
    borderRadius: moderateScale(25),
    marginVertical: scale(0),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
