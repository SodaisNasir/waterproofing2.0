import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Font } from '../../constants/Fonts'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const Validation = (props) => {
    return (
        <Text style={styles.error}>{'* ' + props.title} </Text>
    )
}

export default Validation

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        // marginLeft: 25,
        marginTop: verticalScale(10),
        fontFamily: Font.Lato700,
        marginHorizontal: scale(8)
    },
})