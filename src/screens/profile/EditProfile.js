import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Switch,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors from '../../components/Colors';
import InputField from '../../components/InputField';
import AuthHeader from '../../components/header/AuthHeader';
import CustomButton from '../../components/CustomButton';
import { Font } from '../../constants/Fonts';
import { useForm } from 'react-hook-form';
import Validation from '../../components/error/Validation';
import { useCallback } from 'react';
import { IS_LOADING } from '../../redux/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { delete_account, edit_profile } from '../../redux/actions/AuthActionss';
import NotificationModal from '../../components/modals/NotificationModal';
import { email_regex } from '../../constants/Regex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";



const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const EditProfile = () => {


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

      <EditProfileUI />
    </LinearGradient>
  );
};
const EditProfileUI = () => {

  const [isModalVisible, setModalVisible] = useState(false);

  const user_id = useSelector(state => state.user_id)
  const user_details = useSelector(state => state.user_details)
  const update_profile_response = useSelector(state => state.update_profile)
  const loading = useSelector(state => state.is_loading)
  useEffect(() => {
    getCheckFaceID();
  }, [])

  const [isEnabled, setIsEnabled] = useState(false);
  const getCheckFaceID = async () => {
    let faceCheck = await AsyncStorage.getItem('face_id');
    console.log("ZZZ : ", faceCheck);
    if (faceCheck == 'true') {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  };
  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState)
    console.log(!isEnabled);
    await AsyncStorage.setItem('face_id', "" + !isEnabled);
  };

 

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all', defaultValues: {
      fname: user_details.first_name,
      lname: user_details.last_name,
      email: user_details.email,
      phone: user_details.phone,
      address: user_details.address,
      city: user_details.city,
      zipcode: user_details.zip_code,
    }
  });
  const [visible, setVisible] = useState(false)

  const onsubmit = data => {
    dispatch(edit_profile(data, user_id, setVisible))
  }

  return (
    <View style={styles.whole}>
      <NotificationModal
        title={update_profile_response?.message}
        visible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        state={update_profile_response?.status}
      />
      <View style={styles.card}>
        <View style={{ marginBottom: verticalScale(30) }}>
          <AuthHeader title={'Profile'} showLogoutbutton={true} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <InputField
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'First Name'}
          /> */}
          <InputField
            name="fname"
            rules={{
              required: 'First name is required',
            }}
            control={control}
            textStyle={styles.InputTextStyle}
            style={styles.textInput}
            placeholder={'First Name'}
          />
          {errors.fname && (
            <Validation title={errors.fname.message} />
          )}
          {/* <InputField
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Last Name'}
          /> */}

          <InputField
            name="lname"
            rules={{
              required: 'Last Name is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Last Name'}
          />
          {errors.lname && (
            <Validation title={errors.lname.message} />
          )}
          {/* <InputField
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Email'}
          /> */}

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
          {errors.email && (
            <Validation title={errors.email.message} />
          )}

          {/* <InputField
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Phone'}
          /> */}

          <InputField
            name="phone"
            rules={{
              required: 'Phone is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Phone'}
          />

          {errors.phone && (
            <Validation title={errors.phone.message} />
          )}

          <InputField
            name="address"
            rules={{
              required: 'Address is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Address'}
          />

          {errors.address && (
            <Validation title={errors.address.message} />
          )}

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
          {errors.city && (
            <Validation title={errors.city.message} />
          )} */}


          {/* <InputField
            name="zipcode"
            rules={{
              required: 'Zipcode is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Zip Code'}
          />
          {errors.zipcode && (
            <Validation title={errors.zipcode.message} />
          )} */}
          {/* <InputField
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Zip Code'} 
         /> */}

          {

            //     Platform.OS == 'ios' ? 

            <View
              style={{
                marginHorizontal: scale(10),
                marginVertical: verticalScale(10),
                width: "100%",
                height: "10%",

                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  marginLeft: scale(10),
                  color: Colors.black,
                  fontSize: moderateScale(18),
                  fontWeight: '500'
                }}
              >Face ID OR Touch ID Login</Text>
              <Switch
                style={{
                  marginRight: scale(20),
                }}
                trackColor={{ false: "#767577", true: Colors.btnColor2 }}
                thumbColor={isEnabled ? Colors.boxcolor : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            //  :
            //  null

          }

          <CustomButton
            title={'Change Password'}
            style={{ marginBottom: verticalScale(5), height: verticalScale(50) }}
            onPress={() => {
              navigation.navigate('changePassword');
            }}
          />



          <CustomButton
            title={'Save Changes'}
            style={{ marginBottom: verticalScale(5), height: verticalScale(60) }}
            onPress={handleSubmit(onsubmit)}
            loading={loading}
          />


          {
            Platform.OS == "ios" &&
            <CustomButton
              title={'Delete Account'}
              style={{ marginBottom: verticalScale(40), height: verticalScale(40) }}
              onPress={() => setModalVisible(true)}
            />
          }





          <View
            style={{
              width: '100%',
              height: verticalScale(30),
            }}></View>
        </ScrollView>
        {Platform.OS === 'android' ? (
          <View
            style={{
              width: '100%',
              height: verticalScale(100),
            }}></View>
        ) : (
          <View
            style={{
              width: '100%',
              height: verticalScale(55),
            }}></View>
        )}
      </View>
      <Modal
        backdropOpacity={0.5}
        onBackdropPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center'
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: "100%",
            borderRadius: 15,
            backgroundColor: '#fff',
            height: 250,
          }}>
          <Text style={styles.sentence}>
            Are you sure you want to delete your account?
          </Text>

          <Text style={{ fontSize: 13, color: '#fb4230', marginTop: 20 }}>
            Note: You will not able to retrieve your account again.
          </Text>

          <View style={styles.raw}>
            <TouchableOpacity
              onPress={() => {
                dispatch(delete_account(user_id));
              }}
              style={{ marginRight: 10 }}>
              <Text style={styles.btnOne}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.btnTwo}>
                cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;

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
  heading: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: moderateScale(25),
    letterSpacing: 0.4,
  },
  subheading: {
    color: Colors.black,
    fontSize: moderateScale(13),
    marginVertical: verticalScale(10),
    fontFamily: Font.Lato400,
  },
  textInput: {
    // marginHorizontal: scale(0),
    paddingBottom: Platform.OS == 'ios' ? verticalScale(15) : verticalScale(0),
    // paddingRight: scale(10),
  },
  InputTextStyle: {
    paddingLeft: Platform.OS == 'ios' ? verticalScale(8) : verticalScale(0),
  },
  sentence: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    color: 'black'
  },
  btnOne: {
    borderRadius: 10,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontSize: 16,
    color: "#fff",
  },
  btnTwo: {
    borderRadius: 10,
    backgroundColor: '#fca40a',
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontSize: 16
  },
  raw: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    marginTop: 30
  }
});
