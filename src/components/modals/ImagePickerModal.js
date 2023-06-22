import React from 'react';
import {StyleSheet, SafeAreaView, Pressable, Image, Text} from 'react-native';
import Modal from 'react-native-modal';

export function ImagePickerModal({
  isVisible,
  onClose,
  onImageLibraryPress,
  onCameraPress,
}) {
  return (
    <Modal
      visible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
      <SafeAreaView style={styles.buttons}>
        <Pressable style={styles.button} onPress={onImageLibraryPress}>
          <Image
            style={styles.buttonIcon}
            source={require('../../assets/images/gallery.png')}
          />
          <Text style={styles.buttonText}>Library</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onCameraPress}>
          <Image
            style={styles.buttonIcon}
            source={require('../../assets/images/camera.png')}
          />
          <Text style={styles.buttonText}>Camera</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    // paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  buttons: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,

    fontFamily: 'Lato-Bold',
    letterSpacing: -0.34,
  },
});
