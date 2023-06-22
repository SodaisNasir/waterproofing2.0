import { View, Text, TextInput, StyleSheet, Image, Platform } from 'react-native';
import React, { useState, forwardRef } from 'react';
import Colors from './Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Font } from '../constants/Fonts';
import { useController } from 'react-hook-form';
const InputField = forwardRef((props, ref) => {
  const { field } = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  });
  return (
    <View style={[styles.field, props.style]}>
      {props.image ? <Image style={styles.image} source={props.image} /> : null}

      <TextInput
        // textAlignVertical={'top'}
        value={field.value}
        ref={ref}
        onChangeText={field.onChange}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        placeholder={props.placeholder}
        placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
        style={[styles.input, props.textStyle]}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        textAlignVertical={props.textAlignVertical}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  field: {
    borderBottomWidth: 1.8,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    paddingBottom: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(10),
    marginTop: scale(10),
    borderRadius: 10,
  },

  image: {
    width: scale(28),
    height: scale(28),
    resizeMode: 'contain',
    marginHorizontal: scale(15),
  },
  input: {
    fontSize: moderateScale(16),
    color: Colors.black,
    // fontWeight: '600',
    fontFamily: Font.Lato400,
    width: '100%'
  },
});

export default InputField;
