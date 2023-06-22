import React from 'react';
import MainStackNavigator from './src/navigation/AppNavigator';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/redux/store';
import { BottomTabNavigator } from './src/navigation/BotTabNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { decrement, increment } from './src/redux/reducer/PersistReducer';
import { useEffect } from 'react';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { NOTIFICATION_TOKEN, USER_DETAILS, USER_ID } from './src/redux/CartItem';
import Loading from './src/components/Loader/Loading';
import OneSignal from 'react-native-onesignal';
import WelcomeStack from './src/navigation/WelcomeStack';

// KEYSTORE
// waterproofing-upload-key.keystore
// waterproofing-key-alias
// password : Awwaterproofing-308


export default function App() {
  const user_id = useSelector(state => state.user_id);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const faceId = await AsyncStorage.getItem('face_id')
   const userData = await AsyncStorage.getItem('user_details');
   const parseData = JSON.parse(userData)
   console.log('parseData', parseData)
   if(faceId === 'false' && parseData != null){
       dispatch({ type: USER_DETAILS, payload: parseData});
       dispatch({ type: USER_ID, payload: parseData.user_id});
   }else{
    console.log('first')
   }
   }
 
   useEffect(() => {
     getData()
   },[])

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('6b3fec5c-62d8-4d02-b4a0-48740ae54df9');
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        OneSignal.add;
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        notificationReceivedEvent.complete(notification);
      },
    );
    OneSignal.setNotificationOpenedHandler(notification => { });
    OneSignal.addSubscriptionObserver(async event => {
      if (event.to.isSubscribed) {
        const state = await OneSignal.getDeviceState();
        console.log('state.userId=======>', state.userId);
        await AsyncStorage.setItem('onesignaltoken', state.userId);
        dispatch({ type: NOTIFICATION_TOKEN, payload: state.userId });
      }
    });



  }, []);

  const dispatch = useDispatch();



  return loading ? <Loading /> : (
    <>
      {user_id == null ? (
        <WelcomeStack />
      ) : user_id == 'user_logout' ?
        <MainStackNavigator />
        :
        <BottomTabNavigator />

      }

    </>
  );
}
