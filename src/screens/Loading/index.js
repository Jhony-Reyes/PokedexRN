/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-19 19:54:37
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-20 18:58:36
 */
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import Theme from '../../common/theme';
import Pokeball from '../../../assets/images/pokeball.json';
import Logo from '../../../assets/images/Pokemon-Logo.png';
import {PokemonsData} from '../../redux/ducks/';

const {width} = Dimensions.get('screen');

const Loading = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation &&
      Promise.resolve(dispatch(PokemonsData.fetchPokemonsData())).then(() =>
        navigation.navigate('Home'),
      );
  });
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <LottieView
        source={Pokeball}
        autoPlay
        loop
        colorFilters={[
          {
            keypath: 'Shape Layer 1',
            color: '#FFFFFF',
          },
          {
            keypath: 'Layer 3 Outlines',
            color: '#FFFFFF',
          },
        ]}
        style={{height: width}}
      />
      <Text style={styles.text}>Pokédex</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    backgroundColor: Theme.primaryColor,
  },
  logo: {
    width: '100%',
    height: 200,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 60,
    fontFamily: 'Pokemon Solid',
    color: '#FFF',
    letterSpacing: 5,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Loading;
