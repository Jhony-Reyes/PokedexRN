/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-20 14:13:18
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-20 14:26:45
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';

export const MainCircle = () => <View style={styles.mainCircle} />;

export const CirclesLight = ({backgroundColor, size}) => (
  <View
    style={{
      ...styles.circlesLight,
      backgroundColor,
      width: size || 20,
      height: size || 20,
    }}
  />
);

const styles = StyleSheet.create({
  mainCircle: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#28AAFD',
    borderWidth: 4,
    borderColor: '#DEDEDE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    marginRight: 10,
  },
  circlesLight: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginHorizontal: 5,
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
