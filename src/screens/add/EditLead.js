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
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import GoogleMaps from '../../components/googlemaps/GoogleMaps';

import Colors from '../../components/Colors';
import InputField from '../../components/InputField';
import AuthHeader from '../../components/header/AuthHeader';
import CustomButton from '../../components/CustomButton';
import {Font} from '../../constants/Fonts';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import Validation from '../../components/error/Validation';
import {email_regex} from '../../constants/Regex';
import {GET_IMAGES} from '../../redux/CartItem';
import {upload_video_url} from '../../constants/BaseURl';
import {createThumbnail} from 'react-native-create-thumbnail';
import ContactInput from '../../components/ContactInput';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const AddLead = ({route}) => {
  const {item} = route.params;
  // console.log('New Data', filteredDataSource);
  // console.log(filteredDataSource[0].lead_id);
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

      <AddLeadUI item={item} />
    </LinearGradient>
  );
};
const AddLeadUI = ({item}) => {
  const user_id = useSelector(state => state.user_id);
  const images = useSelector(state => state.images);
  const video = useSelector(state => state.videos);
  const [videoThumnail, setVideoThumnail] = useState([]);
  console.log('item', item.lead_id);
  // const loading = useSelector(state => state.is_loading)

  const [visible, setVisible] = useState(false);
  const number_updates = useSelector(state => state.number_updates);
  const [number, setNumber] = useState(null);
  const [alternativeNumber, setAlternativeNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [numberValidation, setNumberValidation] = useState('empty');

  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const navigation = useNavigation();

  //edit API will use later

  //! DOING THISS
  const onSubmit = data => {
    if (!number) {
      alert('number is required');
    } else if (!alternativeNumber) {
      alert('Alternative number is required');
    } else if (!address) {
      alert('address is required');
    } else {
      data.address = address;
      data.phone = number;
      data.alternativenumber = alternativeNumber;
      navigation.navigate('addDetailsEdit', {client_details: data, item});
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     reset();
  //   }, []),
  // );

  const _resetFields = () => {
    // if (number != null && alternativeNumber != null) {
    setAlternativeNumber(null);
    setNumber(null);
    console.log('testing...');
    reset();
    // }
  };

  useEffect(() => {
    setNumber(item.phone_number_of_client);
    setAlternativeNumber(item.alternative_number_of_client);
    setAddress(item.address_of_Property);
  }, [item.lead_id]);

  return (
    <View>
      <View style={styles.whole}>
        <ScrollView style={styles.card}>
          <View style={{marginBottom: verticalScale(10)}}>
            <AuthHeader title={'Edit Lead'} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>Update Current Lead</Text>
            <Text style={styles.subheading}>
              Enter the information requested below and upload the photo of your
              crack and get a quote back. We will use the information supplied
              to send the quote by email.
            </Text>

            <InputField
              defaultValue={item.first_name}
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
              defaultValue={item.last_name}
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
            {/* 
          <Controller
            control={control}
            name="address"
            rules={{
              required: 'Address of Property is required',
            }}
            render={({ field: { value, onChange } }) => {
              setAddress(value?.description)
              return (
                <GoogleMaps
                textInputProps={{
                  value: address,
                  onChangeText: (text) => setAddress(text)
                }}
                  name="address"
                  rules={{
                    required: 'Address of Property is required',
                  }}
                  // control={control}
                  style={styles.textInput}
                  textStyle={styles.InputTextStyle}
                  placeholder={'Address of Property'}
                  keyboardType={'default'}
                  onPress={onChange}

                />
              );
            }}
          /> */}
            <GoogleMaps
              textInputProps={{
                value: address,
                placeholderTextColor: 'grey',
                onChangeText: text => setAddress(text),
                fontFamily: Font.Lato400,
                fontSize: moderateScale(16),
                paddingHorizontal: 10,
              }}
              name="address"
              rules={{
                required: 'Address of Property is required',
              }}
              // control={control}
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'Address of Property'}
              keyboardType={'default'}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setAddress(data.description);
                // setAddress(details.)
              }}
            />
            {/* <GoogleMaps
            name="address"
            rules={{
              required: 'Address of Property is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            placeholder={'Address of Property'}
            keyboardType={'default'}
          /> */}

            {errors.address && <Validation title={errors.address.message} />}

            {/* <InputField
              name="city"
              defaultValue={item.city_of_property}
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
              defaultValue={item.state_of_property}
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
              defaultValue={item.zip_code}
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
              defaultValue={item.email_of_client}
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
              value={number == 'null' || number == '' ? '' : number}
              onChangeText={text => setNumber(text)}
              onPress={() =>
                navigation.navigate('EditContactList', {setNumber: setNumber})
              }
            />
            {numberValidation == true && (
              <Validation title={'Phone number of client'} />
            )}

            <ContactInput
              style={styles.textInput}
              textStyle={styles.InputTextStyle}
              placeholder={'Alternative phone number'}
              keyboardType={'number-pad'}
              value={
                alternativeNumber == 'null' || alternativeNumber == ''
                  ? ''
                  : alternativeNumber
              }
              onChangeText={text => setAlternativeNumber(text)}
              onPress={() =>
                navigation.navigate('EditContactList', {
                  setNumber: setAlternativeNumber,
                })
              }
            />

            {/* <InputField
            name="sinnumber"
            defaultValue={item.sin_number}
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
            defaultValue={item.no_of_issues}
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

            <InputField
              name="videoarray"
              defaultValue={item.video_one != null ? item.video_one : ''}
              rules={{
                required: 'Alternative phone number is required',
              }}
              control={control}
              style={[styles.textInput, {display: 'none'}]}
              textStyle={styles.InputTextStyle}
              placeholder={'Number of crack/issue client is telling'}
              keyboardType={'number-pad'}
            />
            <InputField
              name="imagearray"
              defaultValue={item.img_one != null ? item.img_one : ''}
              rules={{
                required: 'Alternative phone number is required',
              }}
              control={control}
              style={[styles.textInput, {display: 'none'}]}
              textStyle={styles.InputTextStyle}
              placeholder={'Number of crack/issue client is telling'}
              keyboardType={'number-pad'}
            />

            <CustomButton
              title={'Next'}
              style={{marginBottom: verticalScale(20)}}
              onPress={handleSubmit(onSubmit)}
              // onPress={() => navigation.goBack()}
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
      Platform.OS === 'android' ? windowHeight * 0.96 : windowHeight * 0.9,
    marginTop: scale(30),

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
  },
});
