import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Platform,
  // TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import Colors from '../../components/Colors';
import InputField from '../../components/InputField';
import AuthHeader from '../../components/header/AuthHeader';
import CustomButton from '../../components/CustomButton';
import { Font } from '../../constants/Fonts';
import Validation from '../../components/error/Validation';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { add_lead, edit_lead } from '../../redux/actions/AuthActionss';
import NotificationModal from '../../components/modals/NotificationModal';
import { base_Url, token } from '../../constants/BaseURl';
import { IS_LOADING, LEAD_GENERATE } from '../../redux/CartItem';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const EditDescription = ({ route }) => {
  const { client_details, video, images , item } = route.params

console.log('item',item)
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

      <AddLeadUI client_details={client_details} video={video} images={images} item={item} />
    </LinearGradient>
  );
};
const AddLeadUI = (client_details, video, images) => {
  const user_id = useSelector(state => state.user_id)
  const loading = useSelector(state => state.is_loading)
  const lead_status = useSelector(state => state.lead_generate)
  const dispatch = useDispatch()
console.log(client_details.item)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all', defaultValues: {
      description: client_details.item.description
    }
  });
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false)
  const onSubmit = (data) => {
    const description = data?.description
    dispatch(edit_lead(client_details, user_id, navigation, description, setVisible, client_details.video, client_details.images , client_details.item))
  }
  // const asdasd = async (data) => {
  //   const description = data.description

  //   const video = client_details.video.map((item, index) => {
  //     return { "uri": item.uri, "fileName": item.fileName }
  //   })
  //   const images = client_details.images.map((item, index) => {
  //     return { "uri": item.uri, "fileName": item.fileName }
  //   })
  //   console.log(JSON.stringify(client_details.video))
  //   // const images = JSON.stringify(client_details.images)
  //   // return async dispatch => {
  //   await dispatch({ type: IS_LOADING, payload: true })
  //   try {
  //     let base_url = `${base_Url}/add_lead.php`;
  //     let checkEmail = new FormData();
  //     checkEmail.append('token', token);
  //     checkEmail.append('user_id', user_id);
  //     checkEmail.append('firstname', client_details.client_details.fname);
  //     checkEmail.append('lastname', client_details.client_details.lname);
  //     checkEmail.append('address_of_property', client_details.client_details.address);
  //     checkEmail.append('city_of_property', client_details.client_details.city);
  //     checkEmail.append('state_of_property', client_details.client_details.state);
  //     checkEmail.append('zipcode', client_details.client_details.zipcode);
  //     checkEmail.append('email_of_client', client_details.client_details.email);
  //     checkEmail.append('phone_number_of_client', client_details.client_details.phone);
  //     checkEmail.append('alternative_number_of_client', client_details.client_details.alternativenumber);
  //     checkEmail.append('no_of_clients', client_details.client_details.issue);
  //     checkEmail.append('sin_number', client_details.client_details.sinnumber);
  //     checkEmail.append('description', description);
  //     checkEmail.append('videos', [...JSON.stringify(client_details.video)]);
  //     checkEmail.append('images', [...JSON.stringify(client_details.images)]);
  //     const response = await fetch(base_url, {
  //       method: 'post',
  //       body: checkEmail,
  //     });

  //     const responseData = await response.json();
  //     console.log("responseData ", responseData)
  //     if (responseData.status === true) {
  //       await dispatch({ type: LEAD_GENERATE, payload: responseData })
  //       await dispatch({ type: IS_LOADING, payload: false })
  //       setVisible(true)
  //       setTimeout(() => {
  //         navigation.navigate('wallet')
  //         setVisible(false)
  //       }, 1000);
  //     } else {
  //       await dispatch({ type: LEAD_GENERATE, payload: responseData })
  //       await dispatch({ type: IS_LOADING, payload: false })
  //       setVisible(true)
  //     }
  //   } catch (error) {
  //     await dispatch({ type: IS_LOADING, payload: false })
  //     console.log('error', error);
  //   }

  //   // };
  // };

  return (
    <View style={styles.whole}>

      <View style={styles.card}>
        <View style={{ marginBottom: verticalScale(10) }}>
          <AuthHeader title={'Add Details'} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.addphoto}>
            <Text style={styles.textphoto}>Add Description</Text>
            <Text style={styles.lorem}>
            Please use the field below to tell us more about this lead. Do you represent the buyer or seller? How many cracks? Do you see a point of water entry?
            </Text>

            <InputField
              name="description"
              control={control}
              // rules={{
              //   required: 'Description is required',
              // }}
              textAlignVertical={'top'}
              multiline={true}
              numberOfLines={10}
              placeholder={'Description'}
              style={styles.inputField}

            />
            {/* {errors.description && (
              <Validation title={errors.description.message} />
            )} */}
          </View>

          <CustomButton
            title={'Submit'}
            style={{
              marginBottom: verticalScale(20),
              marginTop: verticalScale(130),
              height: verticalScale(50),
            }}
            loading={loading}
            // onPress={handleSubmit(asdasd)}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
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
      </View>
      <NotificationModal
        title={lead_status?.message}
        visible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        state={lead_status?.status}
      />
    </View>
  );
};

export default EditDescription;

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
  inputField: {
    borderWidth: 2,
    height: verticalScale(130),
    borderColor: Colors.btnColor1,
    borderBottomWidth: 2,
    borderBottomColor: Colors.btnColor1,
    paddingLeft: scale(10),

    // textAlignVertical: 'top',
    // backgroundColor: 'red',
  },
  addphoto: {
    marginTop: verticalScale(40),
  },
  textphoto: {
    fontSize: moderateScale(27),
    color: Colors.black,
    fontFamily: Font.Lato700,
    marginBottom: verticalScale(3),
  },
  lorem: {
    lineHeight: verticalScale(16),
    color: 'rgba(0,0,0,0.7)',
    fontFamily: Font.Lato400,
    // fontWeight: '500',
  },

  addvideo: {
    marginTop: verticalScale(20),
  },
});
