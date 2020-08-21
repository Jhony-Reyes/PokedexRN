/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-21 01:24:26
 * @Last Modified by:   Jhony Reyes
 * @Last Modified time: 2020-08-21 01:24:26
 */

import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Loading, Home, AllPokemons} from './src/screens';
import Theme from './src/common/theme';

const Stack = createStackNavigator();
const App = () => {
  const {top} = useSafeAreaInsets();
  const {allPokemons} = useSelector(({pokemonsData}) => pokemonsData);
  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={{backgroundColor, height: top}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
  return (
    <RootSiblingParent>
      <MyStatusBar
        backgroundColor={Theme.primaryColor}
        barStyle="light-content"
      />
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Loading">
          {!allPokemons.length ? (
            <Stack.Screen name="Loading" component={Loading} />
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="AllPokemons" component={AllPokemons} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
};

export default App;
