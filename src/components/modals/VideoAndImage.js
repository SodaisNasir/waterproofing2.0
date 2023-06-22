import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../Colors';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import CustomButton from '../CustomButton';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


// import OverlayButton from '../Buttons/OverlayButton';
export function VideoAndImage({ isVisible, onClose, message, onPress, videos, index, video_delete }) {
    return (
        <Modal
            visible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={styles.container}>
            <View style={styles.notificationBox}>
                <Video
                    source={{ uri: videos }}
                    style={{ height: 200, width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                    resizeMode={'stretch'}
                    paused={false}
                    controls={true}
                    muted
                />
                {/* <View
                    style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
                    <Text style={styles.text}>{message}</Text>
                </View> */}
                {/* <View style={{ flexDirection: 'row', width: '100%' }}> */}

                <CustomButton
                    title={'Remove'}
                    arrow={true}
                    onPress={() => {

                        video_delete(index);
                        onClose()
                    }
                    }
                />
                <CustomButton
                    title={'Cancel'}
                    arrow={true}
                    onPress={onClose}
                />
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0.95)',
    },
    logo: {
        height: 100,
        width: 100,
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -65 }],
    },

    notificationBox: {
        width: '80%',
        height: verticalScale(300),
        borderRadius: 10,
        backgroundColor: 'white',
        alignSelf: 'center',

    },
    text: {
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        transform: [{ translateY: 15 }],
    },
});
