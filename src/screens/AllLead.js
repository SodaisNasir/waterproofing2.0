import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import React, { useEffect } from 'react';

import Colors from '../components/Colors';
import {useForm} from 'react-hook-form';
import AuthHeader from '../components/header/AuthHeader';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../constants/Fonts';
import LeadCard from '../components/card/LeadCard';
import {useDispatch, useSelector} from 'react-redux';
import {get_all_lead} from '../redux/actions/AuthActionss';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import Loading from '../components/Loader/Loading';
import GoogleMaps from '../components/googlemaps/GoogleMaps';
import {useState} from 'react';
import {base_Url, upload_url, upload_video_url} from '../constants/BaseURl';
import {
  DELETE_IMAGES,
  DELETE_VIDEOS,
  GET_IMAGES,
  GET_VIDEOS,
} from '../redux/CartItem';
import {createThumbnail} from 'react-native-create-thumbnail';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const AddLead = () => {
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

      <AddLeadUI />
    </LinearGradient>
  );
};
const AddLeadUI = () => {
  const user_id = useSelector(state => state.user_id);
  const loading = useSelector(state => state.is_loading);
  const get_lead = useSelector(state => state.get_lead);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const dispatch = useDispatch();
  const [videoThumnail, setVideoThumnail] = useState([]);
  const onsubmit = async data => {
    dispatch(get_all_lead(user_id, setFilteredDataSource));
  };



  useFocusEffect(
    useCallback(() => {
      onsubmit();
    }, []),
  );

  

  const searchFilterFunction = text => {
    if (get_lead && get_lead.length > 0) {
      const newData = get_lead.filter(function (item) {
        const itemData = item.first_name
          ? item.first_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(get_lead);
      console.log('first')
    }
  };
  

  const _navigationHandler = async item => {
    dispatch({type: DELETE_IMAGES, payload: []});
    dispatch({type: DELETE_VIDEOS, payload: []});

    const images_array = JSON.parse(item.img_one);
    const video_array = JSON.parse(item.video_one);

    const modiefied_images_array = await images_array?.map((item, index) => {
      return {fileName: item, uri: upload_url + item};
    });
    const modiefied_videos_array = await video_array?.map((item, index) => {
      return {fileName: item, uri: upload_video_url + item};
    });
    dispatch({type: GET_IMAGES, payload: modiefied_images_array});
    dispatch({type: GET_VIDEOS, payload: modiefied_videos_array});
    navigation.navigate('editlead', {item});
  };

  useFocusEffect(
    useCallback(() => {
      dispatch({type: GET_IMAGES, payload: []});
      dispatch({type: GET_VIDEOS, payload: []});
      setVideoThumnail([]);
    }, []),
  );

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.whole}>
      <View style={styles.card}>
        <AuthHeader title="All Leads" />
        <View>
          <TextInput
            placeholder="Search Here"
            placeholderTextColor={Colors.btnColor1}
            style={styles.input}
            onChangeText={text => searchFilterFunction(text)}
            // secureTextEntry={secureTextEntry}
          />

          <EvilIcons
            name="search"
            size={35}
            style={{
              position: 'absolute',
              right: 10,
              top: 22,
              color: Colors.btnColor1,
            }}
          />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop: 30}}
          data={filteredDataSource}
          ListEmptyComponent={() => {
            return <Text style={styles.notFound}>No Data Found!</Text>;
          }}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return (
              <LeadCard
                onPress={() => _navigationHandler(item)}
                client={item.first_name}
                address={item.address_of_Property}
                city={item.email_of_client}
                // number={item.no_of_issues}
                status={item.status}
              />
            );
          }}
        />

        <View style={{height: verticalScale(50)}}></View>
      </View>
    </View>
  );
};

export default AddLead;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: Colors.btnColor1,
    // borderWidth: 2,
  },
  listcontainer: {
    borderTopColor: '#D91A21',
    borderRightColor: '#D91A21',
    borderLefrColor: '#D91A21',
    borderBottomColor: '#327BCD',
    borderWidth: 2,
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(15),
    paddingBottom: verticalScale(10),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
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

  valuetext: {
    fontSize: moderateScale(15),
    color: Colors.btnColor1,
    fontFamily: Font.Lato400,
    // fontWeight: '500',
    paddingLeft: scale(20),
  },

  input: {
    borderWidth: 2,
    marginTop: verticalScale(10),
    paddingLeft: scale(20),
    borderRadius: moderateScale(15),
    borderColor: Colors.btnColor1,
    paddingVertical: Platform.OS == 'ios' ? 13 : 10,
  },

  client: {
    fontSize: moderateScale(20),
    paddingLeft: scale(20),
    color: Colors.black,
    // fontWeight: '700',
    fontFamily: Font.Lato700,
    paddingVertical: verticalScale(5),
  },
  notFound: {
    fontFamily: Font.Lato700Italic,
    textAlign: 'center',
    fontSize: moderateScale(20),
    marginTop: '60%',
  },
});
