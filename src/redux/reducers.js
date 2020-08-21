/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-19 22:18:09
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-08-20 00:44:00
 */
import {combineReducers} from 'redux';
import {PokemonsData} from './ducks';

const rootReducer = combineReducers({
  pokemonsData: PokemonsData.reducer,
});

export default rootReducer;
