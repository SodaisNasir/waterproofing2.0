import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

import Lottie from 'lottie-react-native';
import Colors from '../Colors';
import { Font } from '../../constants/Fonts';

const NotificationModal = ({
  visible,
  onBackButtonPress,
  onBackdropPress,
  title,
  state
}) => {
  return (
    <Modal
      style={styles.modalContainer}
      visible={visible}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}>
      <View style={styles.taskCardContainer}>
        <Text style={styles.text}>{title}</Text>
        {state ? <Lottie
          style={{ width: 70, height: 70 }}
          source={require('../lootieFile/tick.json')}
          autoPlay
          loop
          speed={0.8}
        /> : <Lottie
          style={{ width: 70, height: 70 }}
          source={require('../../assets/Lootie/Close.json')}
          autoPlay
          loop
          speed={0.8}
        />}

      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.80)',
    flex: 1,
    marginHorizontal: 0,
    borderWidth: 0,
    justifyContent: 'flex-start',
    margin: 0,
  },
  taskCardContainer: {
    marginTop: 30,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  text: {
    // color: Colors.black,
    fontSize: 20,
    width: '65%',
    color: Colors.btnColor1,
    fontFamily: Font.Lato700,
  },
});
