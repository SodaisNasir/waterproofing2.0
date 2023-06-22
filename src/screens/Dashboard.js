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
  FlatList,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../components/Colors';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CardDashboard from '../components/card/CardDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { get_dashboard_data } from '../redux/actions/AuthActionss';
import Loading from '../components/Loader/Loading';
import OneSignal from 'react-native-onesignal';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const Dashboard = () => {
  const loading = useSelector(state => state.is_loading);
  const user_id = useSelector(state => state.user_id);

  const dispatch = useDispatch();
  const onsubmit = async data => {
    dispatch(get_dashboard_data(user_id));
  };

  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      OneSignal.add;
      onsubmit();
      const data = notification.additionalData;
      notificationReceivedEvent.complete(notification);
    },
  );

  useFocusEffect(
    useCallback(() => {
      onsubmit();
    }, []),
  );

  return loading ? (
    <Loading />
  ) : (
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

      <Image
        source={require('../components/images/logo.png')}
        style={{
          width: '100%',
          height: verticalScale(70),
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: verticalScale(60),
        }}
      />

      <DashboardUI />
    </LinearGradient>
  );
};
const DashboardUI = () => {
  const navigation = useNavigation();
  const user_id = useSelector(state => state.user_id);
  const dashboard_data = useSelector(state => state.get_dashboard_data?.data);

  const data = [
    {
      id: 1,
      title: 'TOTAL LEADS',
      number: 20,
      color1: '#D91A21',
      color2: '#104078',
    },
    {
      id: 2,
      title: 'TOTAL REVENUE',
      number: '$700',
      color1: '#9B1796',
      color2: '#104078',
    },
  ];
  return (
    <View style={styles.whole}>
      <View style={styles.imageContainer}></View>
      <View style={{ marginTop: verticalScale(40) }}>
        <CardDashboard
          title={'TOTAL SUBMISSIONS'}
          number={dashboard_data?.total_leads}
          colorone={'#D91A21'}
          colortwo={'#104078'}
        />
        {dashboard_data?.show_revenue == 'enable' &&
          <CardDashboard
            title={'TOTAL EARNINGS'}
            number={`$${dashboard_data?.total_revenue ? dashboard_data?.total_revenue : 0
              }`}
            colorone={'#9B1796'}
            colortwo={'#104078'}
          />
        }
        {dashboard_data?.show_completed_leads == 'enable' &&
          <CardDashboard
            title={'CLOSED DEALS'}
            number={`${dashboard_data?.total_revenue ? dashboard_data?.total_revenue : 0
              }`}
            colorone={'#9B1796'}
            colortwo={'#104078'}
          />
        }

      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  whole: {
    flex: 1,
  },
});
