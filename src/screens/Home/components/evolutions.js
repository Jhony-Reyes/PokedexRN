/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-20 12:48:07
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-20 23:35:48
 */

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default ({currentPokemon}) => (
  <View style={styles.aboutRoot}>
    {currentPokemon.evolutions.evolutionData ? (
      <>
        <Text style={styles.nameText}>
          {currentPokemon.evolutions.evolutionData.name}
        </Text>
        <Image
          style={{width: 200, height: 200, alignSelf: 'center'}}
          source={{
            uri: currentPokemon.evolutions.evolutionData.sprites.front_default,
          }}
        />
        <Text style={styles.aboutTextItem}>
          Height:
          <Text
            style={
              styles.aboutSubTextItem
            }>{` ${currentPokemon.evolutions.evolutionData.height} ft`}</Text>
        </Text>
        <Text style={styles.aboutTextItem}>
          Weight:
          <Text
            style={
              styles.aboutSubTextItem
            }>{` ${currentPokemon.evolutions.evolutionData.weight} lb`}</Text>
        </Text>
      </>
    ) : (
      <View>There is not evolutions</View>
    )}
  </View>
);

const styles = StyleSheet.create({
  aboutRoot: {
    width: '100%',
  },
  nameText: {
    fontSize: 25,
    fontFamily: 'Lato-Black',
    textAlign: 'center',
  },
  aboutTextItem: {
    fontSize: 16,
    fontFamily: 'Lato-Black',
  },
  aboutSubTextItem: {
    fontFamily: 'Lato-Regular',
  },
});
