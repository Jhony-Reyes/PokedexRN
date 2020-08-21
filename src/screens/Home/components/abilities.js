/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-20 12:48:07
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-21 01:04:35
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default ({currentPokemon}) => (
  <View style={styles.aboutRoot}>
    {currentPokemon.abilities.map((i) => (
      <View key={i.id} style={styles.abilityItem}>
        <Text style={styles.abilityTitle}>{i.name}</Text>
        <View
          style={{
            ...styles.typeContainer,
            backgroundColor: currentPokemon.species.color.name,
          }}
        />
        <Text style={styles.aboutText}>
          {i.effect_entries
            .find((o) => o.language.name === 'en')
            .effect.replace(/\n/g, ' ')}
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  aboutRoot: {
    width: '100%',
  },
  abilityItem: {
    marginHorizontal: 10,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  typeContainer: {
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    height: 10,
    marginTop: 3,
  },
  abilityTitle: {
    fontSize: 18,
    fontFamily: 'Lato-Black',
  },
  aboutText: {
    marginTop: 10,
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    textAlign: 'justify',
  },
});
