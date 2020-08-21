/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-20 12:28:41
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-20 13:48:51
 */

import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({text, containerStyle, textStyle, onPress}) => (
  <TouchableOpacity
    style={[styles.container, containerStyle]}
    onPress={onPress}>
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DEDEDE',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
});

export default Button;
