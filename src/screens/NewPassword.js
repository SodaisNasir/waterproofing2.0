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
import { update_password } from '../redux/actions/AuthActionss';
import { useDispatch, useSelector } from 'react-redux';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const OTPScreen = ({ route }) => {
  const { email } = route.params
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

      <OTPScreenUi email={email} />
    </LinearGradient>
  );
};
const OTPScreenUi = ({ email }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  const data = useSelector(state => state.update_password)
  const loading = useSelector(state => state.is_loading)

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();


  const dispatch = useDispatch()
  const change_password = (data) => {
    const password = data.password
    dispatch(update_password(email, password, setVisible, navigation))
  }

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
        <AuthHeader title={'New Password'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.subheading}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>
          <InputField
            name="password"
            control={control}
            style={styles.inputField}

            rules={{
              required: 'Password is required',
            }}
            placeholder={'Enter Password'}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message} </Text>
          )}



          <InputField
            name="confirmPassword"
            rules={{
              required: '*Password is required',
              minLength: {
                value: 8,
                message: '*Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: '*Password too long (maximum length is 16)',
              },
              validate: {
                positive: value =>
                  value === watch('password') || 'The passwords do not match',
              },
            }}
            control={control}
            style={styles.inputField}
            secureTextEntry={true}
            placeholder={'Confirm Password'}
          />
          {errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword.message} </Text>
          )}

          <CustomButton
            title={'Continue'}
            onPress={handleSubmit(change_password)}
            loading={loading}
          />
          <ImageLogo />
        </ScrollView>
      </View>
    </View>
  );
};

export default OTPScreen;

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
    paddingBottom: 0,
    height: verticalScale(45),
    borderBottomColor: Colors.btnColor1,
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
