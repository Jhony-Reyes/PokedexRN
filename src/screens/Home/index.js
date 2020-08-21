/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-19 19:54:58
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-21 01:39:14
 */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Theme from '../../common/theme';
import {
  CustomButton,
  CustomTextInput,
  MainCircle,
  CirclesLight,
  PokemonCard,
} from '../../common/components/';
import {About, Evolutions, Abilities} from './components/';
import {PokemonsData} from '../../redux/ducks/';
import Loading from '../Loading/';

const {width} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const currentInfoarray = [
    {name: 'About', key: 0},
    {name: 'Evolutions', key: 1},
    {name: 'Abilities', key: 2},
  ];
  const [currentIndexInfo, setCurrentIndexInfo] = useState(0);
  const {currentPokemon} = useSelector(({pokemonsData}) => pokemonsData);
  const flatListInfo = useRef(null);
  const dispatch = useDispatch();
  const [pokemonText, setPokemonText] = useState();
  const [loading, setLoading] = useState(false);

  const fetchPokemonByIdOrName = () => {
    if (pokemonText) {
      setLoading(true);
      setCurrentIndexInfo(0);
      Promise.resolve(
        dispatch(PokemonsData.fetchPokemonByIdOrName(pokemonText)),
      )
        .then(() => {
          setPokemonText('');
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setPokemonText('');
        });
    }
  };

  if (loading) {
    return <Loading />;
  }
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
              text="View all Pokemons"
              containerStyle={{
                marginTop: 15,
              }}
              onPress={() => navigation.navigate('AllPokemons')}
            />
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.bodyContainer}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive">
        <View style={styles.searchRow}>
          <CustomTextInput
            placeholder="Search a Pokemon"
            onChangeText={(text) => setPokemonText(text)}
          />
          <CustomButton text="Search" onPress={fetchPokemonByIdOrName} />
        </View>
        <View style={{paddingTop: 30, width: '100%'}}>
          <PokemonCard currentPokemon={currentPokemon} />
          <FlatList
            horizontal
            contentContainerStyle={styles.optionsContaner}
            data={currentInfoarray}
            keyExtractor={(item) => item.key.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setCurrentIndexInfo(item.key);
                  flatListInfo.current.scrollToIndex({
                    index: item.key,
                  });
                }}>
                <Text
                  style={{
                    ...styles.optionsText,
                    color: currentIndexInfo === item.key ? '#FFE748' : '#FFF',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <FlatList
            ref={flatListInfo}
            data={currentInfoarray}
            pagingEnabled
            bounces={false}
            onScroll={({nativeEvent}) => {
              const currentItem = Math.ceil(
                nativeEvent.contentOffset.x /
                  nativeEvent.layoutMeasurement.width,
              );
              setCurrentIndexInfo(currentItem);
            }}
            snapToInterval={width - 60}
            horizontal
            decelerationRate="fast"
            style={styles.infoScroll}
            keyExtractor={(item) => item.name}
            renderItem={({item}) => {
              switch (item.key) {
                case 0:
                  return (
                    <View style={styles.infoContainer}>
                      <About currentPokemon={currentPokemon} />
                    </View>
                  );
                case 1:
                  return (
                    <View style={styles.infoContainer}>
                      <Evolutions currentPokemon={currentPokemon} />
                    </View>
                  );
                case 2:
                  return (
                    <View style={styles.infoContainer}>
                      <Abilities currentPokemon={currentPokemon} />
                    </View>
                  );
                default:
                  return <View style={styles.infoContainer} />;
              }
            }}
          />
        </View>
      </ScrollView>
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
    padding: 30,
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoScroll: {
    width: width - 60,
    shadowColor: '#000',
    marginTop: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 100,
  },
  infoContainer: {
    width: width - 60,
    padding: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  optionsContaner: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 15,
  },
  optionsText: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
  },
});

export default Home;
