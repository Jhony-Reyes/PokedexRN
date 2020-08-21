/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-19 22:21:53
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-21 00:46:16
 */

import Axios from 'axios';
import Toast from 'react-native-root-toast';

/* Types */
const FETCH_POKEMONS_DATA_SUCCESSFULLY = 'FETCH_POKEMONS_DATA_SUCCESSFULLY';
const FETCH_CURRENT_POKEMON_SUCCESSFULLY = 'FETCH_CURRENT_POKEMON_SUCCESSFULLY';

/* Actions */
const fetchPokemonsDataSuccessfully = (payload) => ({
  type: FETCH_POKEMONS_DATA_SUCCESSFULLY,
  payload,
});

export const fetchCurrentPokemonSuccessfully = (payload) => ({
  type: FETCH_CURRENT_POKEMON_SUCCESSFULLY,
  payload,
});

/* Reducer */
const initialState = {
  allPokemons: [],
  nextUrlForGetPokemonsData: null,
  currentPokemon: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMONS_DATA_SUCCESSFULLY:
      return {
        ...state,
        allPokemons: [...state.allPokemons, ...action.payload.allpokemons],
        nextUrlForGetPokemonsData: action.payload.next,
      };
    case FETCH_CURRENT_POKEMON_SUCCESSFULLY:
      return {
        ...state,
        currentPokemon: action.payload,
      };
    default:
      return state;
  }
};

/* Side Effects */

export const fetchPokemonsData = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const {pokemonsData} = getState();
    Axios.get(
      pokemonsData.nextUrlForGetPokemonsData ||
        'https://pokeapi.co/api/v2/pokemon?limit=20',
    )
      .then(async ({data}) => {
        const {results, next} = data;
        const allpokemons = await Promise.all(
          results.map(
            async (pokemon) =>
              await dispatch(fetchPokemonByIdOrName(pokemon.name, true)),
          ),
        );
        await new Promise((resolve2) => {
          if (Object.keys(pokemonsData.currentPokemon).length === 0) {
            resolve2(dispatch(fetchCurrentPokemonSuccessfully(allpokemons[0])));
          } else {
            resolve2();
          }
        });

        await dispatch(fetchPokemonsDataSuccessfully({allpokemons, next}));
        resolve('fetchPokemonsData successfully');
      })
      .catch((error) => {
        Toast.show('Error getting Pokemons data', {
          duration: Toast.durations.LONG,
          position: 80,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        reject(`Error getting pokemons data: ${error}`);
      });
  });
};

export const fetchPokemonByIdOrName = (nameOrId, forMany) => (dispatch) => {
  return new Promise((resolve, reject) =>
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`)
      .then(async (response) => {
        const {species} = response.data;
        const speciesResponse = await Axios.get(species.url);
        const evolutionsResponse = await Axios.get(
          speciesResponse.data.evolution_chain.url,
        ).then(async (resp) => {
          if (resp.data.chain.evolves_to.length > 0) {
            return Axios.get(
              `https://pokeapi.co/api/v2/pokemon/${resp.data.chain.evolves_to[0].species.name}`,
            ).then((resp2) => ({
              ...resp.data,
              evolutionData: resp2.data,
            }));
          }
          return resp.data;
        });
        const abilitiesResponse = await Promise.all(
          response.data.abilities.map((i) => {
            return Axios.get(i.ability.url).then((ability) => ability.data);
          }),
        );
        const response1 = {
          ...response.data,
          species: speciesResponse.data,
          evolutions: evolutionsResponse,
          abilities: abilitiesResponse,
        };
        !forMany &&
          (await dispatch(fetchCurrentPokemonSuccessfully(response1)));
        resolve(response1);
      })
      .catch((error) => {
        Toast.show('Error getting Pokemon, try again', {
          duration: Toast.durations.LONG,
          position: 80,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        reject(`Error getting Pokemon by id or name: ${error}`);
      }),
  );
};
