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
import { Font } from '../constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import {
  new_password,
  register,
  resend_otp,
} from '../redux/actions/AuthActionss';
import NotificationModal from '../components/modals/NotificationModal';
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const SignUpOTp = ({ route }) => {
  const dispatch = useDispatch();
  const { email } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const loading = useSelector(state => state.is_loading);
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

      <OTPScreenUi
        // otp={otp}
        email={email}
      />

      <NotificationModal
        title={error}
        visible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        state={status}
      />
    </LinearGradient>
  );
};
const OTPScreenUi = ({ email }) => {
  const otp = useSelector(state => state.otp);
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const CELL_COUNT = 4;
  const [counter, setCounter] = useState(50);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  //   const {VerifyEmailApi} = useContext(AuthContext);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  console.log('otp', otp)
  const register_account = async () => {
    if (otp == value) {
      navigation.navigate('newpassword', { email });
    } else {
      setModalVisible(true);
      setError('Invalid your otp');
      setStatus(false);
    }
  };

  const reset_otp = () => {
    dispatch(resend_otp(email, setCounter));
  };

  const onClickNext = () => {
    if (value.length == 4) {
      //    navigation.navigate('changePassowrd');
    } else {
      alert('wlenth must be 4');
    }
  };

  const loading = useSelector(state => state.is_loading);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <View style={styles.whole}>
      <View style={styles.card}>
        <AuthHeader title={'OTP Screen'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.subheading}>
   
            Please, enter 4 digit OTP code sent on your email {email} to register this account.
          </Text>
          <View style={styles.otpContainer}>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <CustomButton
            style={styles.button}
            title={'Verify'}
            onPress={register_account}
            loading={loading}
          />
          <ImageLogo />
          {counter == 0 ? (
            <>
              <Text style={styles.resendText}>You can resend the otp</Text>
              <TouchableOpacity onPress={reset_otp}>
                <Text style={styles.clickHereText}>Click Here</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.resendText}>
                You can resend the code after {counter}{' '}
                {counter > 1 ? 'secs' : 'sec'}
              </Text>
              <TouchableOpacity onPress={reset_otp}>
                <Text style={styles.clickHereText}>Click Here</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
        <NotificationModal
          title={error}
          visible={modalVisible}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          state={status}
        />
      </View>
    </View>
  );
};

export default SignUpOTp;

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
  codeFieldRoot: { marginTop: 10 },
  cell: {
    width: 70,
    height: 70,
    lineHeight: 60,
    fontSize: 24,
    borderWidth: 1,
    borderRadius:moderateScale(10),
    borderColor: '#00000030',
    textAlign: 'center',
    justifyContent: 'center'
  },
  focusCell: {
    borderColor: '#000',
  },
  resendText: {
    color: Colors.lightBlack,

    fontSize: scale(16),
    textAlign: 'center',
    fontFamily: Font.Lato400,
  },
  button: {
    marginHorizontal: scale(0),
  },
  clickHereText: {
    color: Colors.btnColor1,
    fontSize: scale(16),
    textAlign: 'center',
    fontFamily: Font.Lato700,
  },
});
