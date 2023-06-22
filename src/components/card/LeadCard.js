import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Colors from '../Colors';
import {Font} from '../../constants/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const LeadCard = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.listcontainer}>
      <View style ={{width :'80%' }}>
        <Text style={styles.client}>{props.client}</Text>

        <Text style={styles.valuetext}>{props.address}</Text>

        <Text style={styles.valuetext}>{props.city}</Text>

        {/* <Text style={styles.valuetext}>{props.number}</Text> */}

        <Text style={styles.valuetext}>{props.status}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={props.onPress}>
          <AntDesign name="edit" size={20} style={styles.editIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeadCard;

const styles = StyleSheet.create({
  listcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingVertical: Platform.OS == 'ios' ? 13 : 0,
  },

  client: {
    fontSize: moderateScale(20),
    paddingLeft: scale(20),
    color: Colors.black,
    // fontWeight: '700',
    fontFamily: Font.Lato700,
    paddingVertical: verticalScale(5),
  },
  editIcon: {
    marginHorizontal: scale(20),
    marginVertical: verticalScale(5),
    color: Colors.btnColor1,
  },
});
