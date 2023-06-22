import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Colors from '../Colors';
import { Font } from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { IS_SIGN_IN, USER_DETAILS, USER_ID } from '../../redux/CartItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log_out } from '../../redux/actions/AuthActionss';


const AuthHeader = ({ title, showLogoutbutton }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.user_id)
  const logout = async () => {
    try {
      dispatch(log_out(user_id))
      await AsyncStorage.removeItem('user_details');
      dispatch({
        type: USER_DETAILS,
        payload: {}
      })
      dispatch({
        type: USER_ID,
        payload: null
      })
    } catch (e) {
      alert(e);
    }
  };
  return (
    <View style={styles.container}>
      <MaterialIcons
        onPress={() => navigation.goBack()}
        name="keyboard-backspace"
        size={moderateScale(30)}
        color={'black'}
      />
      <Text style={styles.titleText}>{title}</Text>
      {showLogoutbutton && (
        <SimpleLineIcons
          name="logout"
          color={'black'}
          size={30}
          onPress={logout}
        />
      )}
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: Colors.black,
    fontFamily: Font.Lato700,

    fontSize: moderateScale(22),
    width: scale(260),

    textAlign: 'center',
  },
});
