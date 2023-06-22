import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../components/Colors';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Font } from '../constants/Fonts';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { VERIFY_EMAIL } from '../redux/CartItem';
import { CreateAccountApi } from '../redux/actions/AuthActionss';
import Loading from '../components/Loader/Loading';
import NotificationModal from '../components/modals/NotificationModal';
import { email_regex } from '../constants/Regex';
import Validation from '../components/error/Validation';
import GooglePlacesInput from '../components/googlemaps/GoogleMaps';
import { useCallback } from 'react';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const CreateAccount = () => {
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

      <CreateAccountUI />
    </LinearGradient>
  );
};
const CreateAccountUI = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [address, setAddress] = useState(null)


  // const isSignIn = useSelector(state => state);
  // console.log(isSignIn);
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  const [modalVisible, setModalVisible] = useState(false);
  const onSubmit = async data => {
    data.address = address
    if (!address) {
      alert('Address is required *')
    } else {
      dispatch(CreateAccountApi(data, navigation, setModalVisible));
    }
  };
  const isSignIn = useSelector(state => state.verify_email);
  const loading = useSelector(state => state.is_loading);


  useFocusEffect(
    useCallback(() => {
      setAddress(null)
      reset()
    }, [])
  )

  return loading ? (
    <Loading />
  ) : (
    <ScrollView contentContainerStyle={styles.whole}>
      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Create your account</Text>
          <Text style={styles.subheading}>
            Please, kindly enter your valid information to create and account.
          </Text>
          <InputField
            name="firstName"
            rules={{
              required: 'First Name is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'First Name'}
          />
          {errors.firstName && <Validation title={errors.firstName.message} />}

          <InputField
            name="lastName"
            rules={{
              required: 'Last Name is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Last Name'}
          />

          {errors.lastName && <Validation title={errors.lastName.message} />}

          <InputField
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: email_regex,
                message: 'Enter a valid email',
              },
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Email'}
          />
          {errors.email && <Validation title={errors.email.message} />}

          <InputField
            name="phone"
            rules={{
              required: 'Phone is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Phone'}
            keyboardType={'number-pad'}
          />
          {errors.phone && <Validation title={errors.phone.message} />}

          {/* <InputField
            name="address"
            rules={{
              required: 'Address is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Address'}
          /> */}

          <GooglePlacesInput
            textInputProps={{
              value: address,
              placeholderTextColor: 'grey',
              paddingHorizontal: scale(10),
              onChangeText: (text) => setAddress(text),
              color: 'rgba(0, 0, 0, 0.4)',
              top: 3,
              right: 5,
              fontSize: scale(16)
            }}
            name="address"
            rules={{
              required: 'Address is required'
            }}
            // control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Address'}
            keyboardType={'default'}
            onPress={(data, details = null) => {
              setAddress(data.description);
            }}
          />

          {errors.address && <Validation title={errors.address.message} />}

          {/* <InputField
            name="zipcode"
            rules={{
              required: 'Zipcode is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Zipcode'}
            keyboardType={'number-pad'}
          />
          {errors.zipcode && <Validation title={errors.zipcode.message} />} */}

          {/* <InputField
            name="city"
            rules={{
              required: 'City is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'City'}
          />
          {errors.city && <Validation title={errors.city.message} />} */}

          <InputField
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: 'Password too long (maximum length is 16)',
              },
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            secureTextEntry={true}
            placeholder={'Password'}
          />
          {errors.password && <Validation title={errors.password.message} />}

          <InputField
            name="confirmPassword"
            rules={{
              required: 'Confirm Password is required',
              minLength: {
                value: 8,
                message: 'Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: 'Password too long (maximum length is 16)',
              },
              validate: {
                positive: value =>
                  value === watch('password') || 'The passwords do not match',
              },
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            secureTextEntry={true}
            placeholder={'Confirm Password'}
          />
          {errors.confirmPassword && (
            <Validation title={errors.confirmPassword.message} />
          )}
          <CustomButton
            title={'Registeration'}
            onPress={handleSubmit(onSubmit)}
          />
          <Text style={styles.already}>Already have an account?</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <LinearGradient
              //   style={styles.buttoncontainer}
              style={styles.signInButton}
              colors={[Colors.pink1, Colors.pink2]}
              useAngle={true}
              angle={45}>
              <Text style={styles.buttonTextSignin}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          {Platform.OS === 'android' ? (
            <View
              style={{
                width: '100%',
                height: verticalScale(60),
              }}></View>
          ) : null}
        </ScrollView>
        <NotificationModal
          title={isSignIn?.message}
          visible={modalVisible}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          state={isSignIn?.status}
        />
      </View>
    </ScrollView>
  );
};

export default CreateAccount;

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
      Platform.OS === 'android' ? windowHeight * 1.00 : windowHeight * 0.92,
    marginTop: scale(20),
    backgroundColor: Colors.white,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    paddingLeft: scale(20),
    paddingRight: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(30),
  },
  heading: {
    color: Colors.black,
    // fontWeight: 'bold',
    fontSize: moderateScale(25),
    letterSpacing: 0.4,
    fontFamily: Font.Lato700,
  },
  subheading: {
    color: Colors.black,
    fontSize: moderateScale(13),
    marginVertical: verticalScale(10),
    fontFamily: Font.Lato400,
  },
  textInput: {
    // marginHorizontal: scale(0),
    marginTop: verticalScale(0),
    paddingBottom: Platform.OS == 'ios' ? verticalScale(5) : verticalScale(0),
    marginBottom: Platform.OS == 'ios' ? verticalScale(15) : verticalScale(0),
  },
  InputTextStyle: {
    paddingLeft: Platform.OS == 'ios' ? verticalScale(8) : verticalScale(0),
    fontFamily: Font.Lato400,
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    // marginLeft: 25,
    marginTop: 5,
    fontFamily: Font.Lato400,
  },
  already: {
    alignSelf: 'center',
    marginTop: scale(10),
    color: Colors.lightBlack,
    fontFamily: Font.Lato400,
  },
  button: {
    marginTop: scale(10),
  },
  signInButton: {
    marginTop: scale(10),
    marginHorizontal: scale(10),
    height: verticalScale(50),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextSignin: {
    fontSize: moderateScale(20),
    color: '#D91A21',
    letterSpacing: 1,
    // fontWeight: '700',
    fontFamily: Font.Lato700,
    // marginLeft: scale(25),
  },
});
