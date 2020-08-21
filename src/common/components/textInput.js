/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-20 13:40:48
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-20 13:55:10
 */
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const CustomTextInput = (props) => (
  <TextInput style={styles.container} {...props} />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 50,
    width: 250,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default CustomTextInput;
