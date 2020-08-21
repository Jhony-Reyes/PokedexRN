/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-20 14:11:20
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-20 22:06:12
 */
import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {CirclesLight} from './circlesLight';

const PokemonCard = ({currentPokemon}) => {
  const imageRef = useRef(null);
  const imageTranslateY = new Animated.Value(-200);
  const imageOpacity = imageTranslateY.interpolate({
    inputRange: [-100, 0],
    outputRange: [0, 1],
  });
  const shadowScale = imageTranslateY.interpolate({
    inputRange: [-100, 0],
    outputRange: [0, 1],
  });
  useEffect(() => {
    Animated.timing(imageTranslateY, {
      toValue: 0,
      duration: 1300,
      useNativeDriver: false,
      easing: Easing.bounce,
    }).start();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.lightsContainer}>
        <CirclesLight backgroundColor="#FF4763" />
        <CirclesLight backgroundColor="#FF4763" />
      </View>
      <View style={styles.pokemonContainer}>
        <Text style={styles.pokemonName} numberOfLines={1}>
          {`${currentPokemon.name
            .charAt(0)
            .toUpperCase()}${currentPokemon.name.slice(1)}`}
        </Text>
        <>
          <Animated.Image
            ref={imageRef}
            resizeMode="contain"
            style={{
              ...styles.pokemonImage,
              transform: [{translateY: imageTranslateY}],
              opacity: imageOpacity,
            }}
            source={{
              uri: currentPokemon.sprites.front_default,
            }}
          />
          <Animated.View
            style={{
              ...styles.shadowContainer,
              transform: [{rotateX: '80deg'}, {scale: shadowScale}],
              opacity: shadowScale,
            }}
          />
        </>
      </View>
      <View style={styles.bottomContainer}>
        <CirclesLight backgroundColor="#FF4763" size={30} />
        <View>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DEDEDE',
    width: '100%',
    height: 300,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    paddingHorizontal: 30,
  },
  lightsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  pokemonContainer: {
    backgroundColor: '#28AAFD',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  pokemonName: {
    color: '#000',
    fontSize: 35,
    paddingLeft: 5,
    fontFamily: 'Lato-Black',
    textAlign: 'center',
  },
  pokemonImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  line: {
    width: 40,
    borderBottomWidth: 5,
    borderColor: '#000',
    marginVertical: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  shadowContainer: {
    width: 100,
    height: 40,
    backgroundColor: 'rgba(000, 000, 000, 0.2)',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: -40,
  },
});

export default PokemonCard;
