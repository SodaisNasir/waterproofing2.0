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
  AppState,
  PermissionsAndroid,
  KeyboardAvoidingViewComponent,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Colors from '../../components/Colors';
import InputField from '../../components/InputField';
import AuthHeader from '../../components/header/AuthHeader';
import CustomButton from '../../components/CustomButton';
import {Font} from '../../constants/Fonts';
import {Controller, useForm} from 'react-hook-form';
import Validation from '../../components/error/Validation';
import {email_regex} from '../../constants/Regex';
import GoogleMaps from '../../components/googlemaps/GoogleMaps';
import {useCallback} from 'react';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

import Contacts from 'react-native-contacts';
import ContactInput from '../../components/ContactInput';
import {useSelector} from 'react-redux';
import {useRef} from 'react';

const AddLead = () => {
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

      <AddLeadUI />
    </LinearGradient>
  );
};
const AddLeadUI = () => {
  const [number, setNumber] = useState(null);
  const [alternativeNumber, setAlternativeNumber] = useState(null);
  const [numberValidation, setNumberValidation] = useState('empty');
  const number_updates = useSelector(state => state.number_updates);
  const [address, setAddress] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
  });
  const navigation = useNavigation();

  const onSubmit = data => {
    if (!number) {
      alert('number is required');
    } else if (address == null) {
      alert('Address is required');
    } else {
      data.address = address;
      data.phone = number;
      data.alternativenumber = alternativeNumber;
      navigation.navigate('addDetails', {client_details: data, reset});
    }
  };

  const requestContactsPermission = async () => {
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Get contacts',
            message: 'Allow access to contacts ' + 'for autocomplete',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Contacts.getAll().then(contacts => {
            console.log('contacts permission');
          });
        } else {
          console.log('contacts permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestContactsPermission();
  });

  const _resetFields = () => {
    // if (number != null && alternativeNumber != null) {
    setAlternativeNumber(null);
    setNumber(null);
    setAddress(null);
    reset();
    // }
  };
  useEffect(() => {
    _resetFields();
  }, [number_updates]);

  return (
    <View>
      <View style={styles.whole}>
        <ScrollView style={styles.card}>
          {/* <GoogleMaps /> */}
          <View style={{marginBottom: verticalScale(10)}}>
            <AuthHeader title={'Add Lead'} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>New Lead</Text>
            <Text style={styles.subheading}>
              Enter the information requested below and upload the photo of your
              crack and get a quote back. We will use the information supplied
              to send the quote by email.
            </Text>

            <InputField
              name="fname"
              rules={{
                required: 'First name is required',
              }}
              control={control}
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'First Name'}
              keyboardType={'default'}
            />
            {errors.fname && <Validation title={errors.fname.message} />}

            <InputField
              name="lname"
              rules={{
                required: 'Last name is required',
              }}
              control={control}
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'Last Name'}
              keyboardType={'default'}
            />
            {errors.lname && <Validation title={errors.lname.message} />}

            <GoogleMaps
              textInputProps={{
                value: address,
                placeholderTextColor: 'grey',
                onChangeText: text => setAddress(text),
                fontFamily: Font.Lato400,
                fontSize: moderateScale(15),
                paddingHorizontal: 10,
                color: 'rgba(0, 0, 0, 0.4)',
                top: 3,
                right: 5,
              }}
              name="address"
              rules={{
                required: 'Address of Property is required',
              }}
              // control={control}
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'Address Of Property'}
              keyboardType={'default'}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setAddress(data.description);
                // setAddress(details.)
              }}
            />

            {errors.address && <Validation title={errors.address.message} />}
            {/* <GoogleMaps /> */}

            {/* <InputField
              name="city"
              rules={{
                required: 'City is required',
              }}
              control={control}
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'City of property'}
              keyboardType={'default'}
            />
            {errors.city && <Validation title={errors.city.message} />} */}

            {/* <InputField
              name="state"
              rules={{
                required: 'State of property is required',
              }}
              control={control}
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'State of property'}
              keyboardType={'default'}
            />
            {errors.state && <Validation title={errors.state.message} />} */}

            {/* <InputField
              name="zipcode"
              rules={{
                required: 'Zip Code is required',
              }}
              control={control}
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'Zip Code'}
              keyboardType={'number-pad'}
            />
            {errors.zipcode && <Validation title={errors.zipcode.message} />} */}

            <InputField
              name="email"
              rules={{
                required: 'Email Of Client is required',
                pattern: {
                  value: email_regex,
                  message: 'Enter a valid email',
                },
              }}
              control={control}
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'Email Of Client'}
              keyboardType={'email-address'}
            />
            {errors.email && <Validation title={errors.email.message} />}

            <ContactInput
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'Phone number of client'}
              keyboardType={'number-pad'}
              value={number}
              onChangeText={text => setNumber(text)}
              onPress={() => navigation.navigate('contactslist', {setNumber})}
            />
            {numberValidation == true && (
              <Validation title={'Phone number of client'} />
            )}

            <ContactInput
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'Alternative phone number'}
              keyboardType={'number-pad'}
              value={alternativeNumber}
              onChangeText={text => setAlternativeNumber(text)}
              onPress={() =>
                navigation.navigate('contactslist', {
                  setNumber: setAlternativeNumber,
                })
              }
            />

            {/* <InputField
            name="alternativenumber"
            rules={{
              required: 'Alternative phone number is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Alternative phone number'}
            keyboardType={'number-pad'}
          /> */}
            {errors.alternativenumber && (
              <Validation title={errors.alternativenumber.message} />
            )}

            {/* <InputField
            name="sinnumber"
            rules={{
              required: 'Sin number of client is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Sin number of client'}
            keyboardType={'number-pad'}
          />
          {errors.sinnumber && <Validation title={errors.sinnumber.message} />} */}

            {/* <InputField
            name="issue"
            rules={{
              required: 'Alternative phone number is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Number of crack/issue client is telling'}
            keyboardType={'number-pad'}
          />
          {errors.issue && <Validation title={errors.issue.message} />} */}

            <CustomButton
              title={'Next'}
              style={{marginBottom: verticalScale(0)}}
              onPress={handleSubmit(onSubmit)}
            />
            {/* navigation.navigate('addDetails'); */}
          </ScrollView>

          <View
            style={{
              width: '100%',
              height:
                Platform.OS == 'ios' ? verticalScale(80) : verticalScale(80),
            }}></View>
        </ScrollView>
      </View>
      <View style={{height: '5%', backgroundColor: 'white'}}></View>
    </View>
  );
};

export default AddLead;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  whole: {
    // position: 'absolute',
    // width: windowWidth,
    // height: windowHeight,
    // justifyContent: 'flex-end',
    height: '95%',
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
    fontFamily: Font.Lato700,
    fontSize: moderateScale(25),
    letterSpacing: 0.4,
  },
  subheading: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: moderateScale(13),
    marginVertical: verticalScale(10),
    fontFamily: Font.Lato400,
    lineHeight: verticalScale(15),
  },
  textInput: {
    // marginHorizontal: scale(0),
    paddingBottom: Platform.OS == 'ios' ? verticalScale(5) : verticalScale(0),
    marginBottom: Platform.OS == 'ios' ? verticalScale(10) : verticalScale(0),

    // paddingRight: scale(10),
  },
  InputTextStyle: {
    paddingLeft: Platform.OS == 'ios' ? verticalScale(8) : verticalScale(0),
    color: Colors.black,
  },
});
