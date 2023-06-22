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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../components/Colors';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import AuthHeader from '../components/header/AuthHeader';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ImageLogo from '../components/Image';
import NotificationModal from '../components/modals/NotificationModal';
import { Font } from '../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { new_password } from '../redux/actions/AuthActionss';
import { useDispatch, useSelector } from 'react-redux';
import Validation from '../components/error/Validation';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


const ResetPassword = () => {
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

      <OTPScreenUi />
    </LinearGradient>
  );
};
const OTPScreenUi = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.is_loading)
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const showmodal = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });


  const onSubmit = async data => {
    const email = data.email
    dispatch(new_password(email, navigation, setVisible));
  };

  const data = useSelector(state => state.verify_email)


  return (
    <View style={styles.whole}>
      <View style={styles.card}>
        <NotificationModal
          title={data?.message}
          visible={visible}
          onBackButtonPress={() => setVisible(false)}
          onBackdropPress={() => setVisible(false)}
          state={data?.status}
        />
        <AuthHeader title={'Verify Email'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.subheading}>
          Confirm your email and we'll send the intructions.
          </Text>

          <InputField
            name="email"
            control={control}
            style={styles.inputField}

            rules={{
              required: 'email is required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Enter a valid email',
              }
            }}
            image={require('../components/images/user.png')}
            placeholder={'Email Address'}
          />
          {errors.email && (
            <Validation title={errors.email.message} />
          )}
          {/* <InputField
              style={styles.inputField}
              placeholder={'Confirm Password'}
            /> */}

          <CustomButton
            title={'Continue'}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />
          <ImageLogo />
        </ScrollView>
      </View>
    </View>
  );
};

export default ResetPassword;

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
      Platform.OS === 'android' ? windowHeight * 0.96 : windowHeight * 0.92,
    marginTop: scale(20),

    backgroundColor: Colors.white,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    paddingLeft: scale(20),
    paddingRight: scale(20),
    paddingTop: scale(5),
    paddingBottom: scale(30),
  },

  subheading: {
    color: Colors.black,
    fontSize: moderateScale(13),
    marginVertical: verticalScale(25),
    paddingHorizontal: scale(20),
    // backgroundColor: 'blue',
    textAlign: 'center',
    fontFamily: Font.Lato400,
  },
  inputField: {
    borderWidth: scale(1),
    borderColor: Colors.btnColor1,
    paddingLeft: scale(6),
    borderBottomColor: Colors.btnColor1,
    borderTopColor: Colors.btnColor1,
    height: verticalScale(45),
    // paddingVertical: 20,
    // borderTopWidth: 1,
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    // marginLeft: 25,
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },

});
