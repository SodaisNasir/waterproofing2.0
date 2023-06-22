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
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../components/Colors';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import AuthHeader from '../../components/header/AuthHeader';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ImageLogo from '../../components/Image';

import NotificationModal from '../../components/modals/NotificationModal';
import { Font } from '../../constants/Fonts';
import Validation from '../../components/error/Validation';
import { useForm } from 'react-hook-form';
import { change_password } from '../../redux/actions/AuthActionss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const ChangePassword = () => {
  return (
    <LinearGradient
      colors={['#302DDE', '#3633CA', '#EC42A0']}
      style={styles.container}>
      <StatusBar backgroundColor={Colors.trayColor} barStyle="light-content" />
      <Image
        source={require('../../components/images/shade.png')}
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
  const reset_response = useSelector(state => state.change_password)
  const user_id = useSelector(state => state.user_id)
  const loading = useSelector(state => state.is_loading)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });
  const [visible, setVisible] = useState(false);
  const showmodal = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 1500);
  };

  const onSubmit = data => {
    dispatch(change_password(data, user_id, setVisible, navigation))
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.whole}>
      <View style={styles.card}>
        <NotificationModal
          title={reset_response?.message}
          visible={visible}
          onBackButtonPress={() => setVisible(false)}
          onBackdropPress={() => setVisible(false)}
          state={reset_response?.status}
        />
        <AuthHeader title={'New Password'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.subheading}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>

          <InputField
            style={styles.inputField}
            name="currentpassword"
            rules={{
              required: 'Current password is required',
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
            textStyle={styles.InputTextStyle}
            placeholder={'Current Password'}
            secureTextEntry={true}
          />
          {errors.currentpassword && (
            <Validation title={errors.currentpassword.message} />
          )}
          {/* <InputField
            style={styles.inputField}
            placeholder={'Enter Password'}
          /> */}

          <InputField
            style={styles.inputField}
            name="newpassword"
            rules={{
              required: 'New password is required',
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

            placeholder={'Enter New Password'}
            secureTextEntry={true}
          />
          {errors.newpassword && (
            <Validation title={errors.newpassword.message} />
          )}

          {/* <InputField
            style={styles.inputField}
            placeholder={'Confirm Password'}
          /> */}

          <InputField
            style={styles.inputField}
            name="confirmpassword"
            rules={{
              required: 'Confirm password is required',
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
                  value === watch('newpassword') || 'The passwords do not match',
              },
            }}
            control={control}
            placeholder={'Confirm Password'}
            secureTextEntry={true}
          />
          {errors.confirmpassword && (
            <Validation title={errors.confirmpassword.message} />
          )}

          <CustomButton
            title={'Save'}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />
          <ImageLogo />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  whole: {
    // position: 'absolute',
    // width: windowWidth,
    // height: windowHeight,
    // justifyContent: 'flex-end',
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
  },
});
