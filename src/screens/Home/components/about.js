/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-20 12:48:07
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-20 23:31:01
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default ({currentPokemon}) => (
  <View style={styles.aboutRoot}>
    <View style={styles.aboutContainer}>
      {currentPokemon.types.map((i) => (
        <View
          key={i.type.name}
          style={{
            marginHorizontal: 10,
          }}>
          <Text style={styles.typeText}>{i.type.name}</Text>
          <View
            key={i.type.name}
            style={{
              ...styles.typeContainer,
              backgroundColor: currentPokemon.species.color.name,
            }}
          />
        </View>
      ))}
    </View>
    <Text style={styles.aboutTextItem}>
      Height:
      <Text
        style={styles.aboutSubTextItem}>{` ${currentPokemon.height} ft`}</Text>
    </Text>
    <Text style={styles.aboutTextItem}>
      Weight:
      <Text
        style={styles.aboutSubTextItem}>{` ${currentPokemon.weight} lb`}</Text>
    </Text>
    <Text style={styles.aboutTextItem}>
      Habitat:
      <Text
        style={
          styles.aboutSubTextItem
        }>{` ${currentPokemon.species.habitat.name}`}</Text>
    </Text>
    <Text
      style={
        styles.aboutText
      }>{`${currentPokemon.species.flavor_text_entries
      .find((i) => i.language.name === 'en' && i.version.name === 'omega-ruby')
      .flavor_text.replace(/\n/g, ' ')}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  aboutRoot: {
    width: '100%',
  },
  aboutContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  typeContainer: {
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    height: 10,
    marginTop: 3,
  },
  typeText: {
    fontSize: 16,
    fontFamily: 'Lato-Black',
  },
  aboutTextItem: {
    fontSize: 16,
    fontFamily: 'Lato-Black',
  },
  aboutSubTextItem: {
    fontFamily: 'Lato-Regular',
  },
  aboutText: {
    marginTop: 10,
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    textAlign: 'justify',
  },
});
