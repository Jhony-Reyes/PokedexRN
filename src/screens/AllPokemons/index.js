/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-19 19:54:58
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-21 01:14:24
 */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Theme from '../../common/theme';
import {CustomButton, MainCircle, CirclesLight} from '../../common/components/';
import {PokemonsData} from '../../redux/ducks/';

const {width} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const {allPokemons} = useSelector(({pokemonsData}) => pokemonsData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchMorePokemons = () => {
    if (!loading) {
      setLoading(true);
      Promise.resolve(dispatch(PokemonsData.fetchPokemonsData()))
        .then(() => setLoading(false))
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const viewOnePokemon = (currentPokemon) => {
    Promise.resolve(
      dispatch(PokemonsData.fetchCurrentPokemonSuccessfully(currentPokemon)),
    ).then(() => navigation.navigate('Home'));
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <MainCircle />
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <CirclesLight backgroundColor="#FF4763" />
              <CirclesLight backgroundColor="#FFE748" />
              <CirclesLight backgroundColor="#4FAE5D" />
            </View>
            <CustomButton
              containerStyle={{
                marginTop: 15,
              }}
              text="Regresar"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          contentContainerStyle={styles.infoScroll}
          data={allPokemons}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.pokemonItem}
              onPress={() => viewOnePokemon(item)}>
              <Image
                resizeMode="contain"
                style={styles.pokemonImage}
                source={{uri: item.sprites.front_default}}
              />
              <Text numberOfLines={1} style={styles.pokemonName}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          onEndReached={fetchMorePokemons}
          onEndReachedThreshold={0.6}
          ListFooterComponent={() =>
            loading && <ActivityIndicator size="large" color="#FFF" />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Theme.primaryColor,
  },
  headerContainer: {
    width: '100%',
    height: 110,
    flexDirection: 'row',
    borderColor: '#89061C',
    borderBottomWidth: 4,
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  bodyContainer: {
    paddingTop: 0,
    paddingBottom: 30,
    flex: 1,
  },
  infoScroll: {
    width: width,
    marginBottom: 100,
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  pokemonItem: {
    width: (width - 80) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingVertical: 10,
  },
  pokemonName: {
    fontSize: 25,
    fontFamily: 'Lato-Bold',
  },
  pokemonImage: {
    width: '100%',
    height: 120,
  },
});

export default Home;
