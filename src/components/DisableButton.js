import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Colors from './Colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Font } from '../constants/Fonts';

const DisableButton = ({ title, style }) => {
    return (
        <View activeOpacity={0.8}>
            <LinearGradient
                style={[styles.container, style, { opacity: 0.5 }]}
                colors={[Colors.btnColor1, Colors.btnColor2]}
                useAngle={true}
                angle={45}>
                <Text style={styles.text}>{title}</Text>
                <Image
                    source={require('./images/arrowright.png')}
                    style={styles.image}
                />
            </LinearGradient>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: scale(20),
        marginHorizontal: scale(10),
        height: verticalScale(50),
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: moderateScale(15),
        justifyContent: 'space-between',
        shadowColor: Colors.pink,
        elevation: 10,
        shadowRadius: moderateScale(15),
        shadowOffset: { width: 1, height: 2 },
    },
    text: {
        fontSize: moderateScale(20),
        color: Colors.white,
        letterSpacing: 1,
        // fontWeight: '700',
        fontFamily: Font.Lato700,
        marginLeft: scale(25),
    },

    image: {
        width: scale(30),
        height: scale(28),
        resizeMode: 'contain',
        marginRight: scale(25),
    },
});

export default DisableButton;
