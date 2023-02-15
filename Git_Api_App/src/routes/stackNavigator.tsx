import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SpashScreen from '../views/spashScreen';
import HeaderTitle from '../components/headerComponent';
import HeaderRight from '../components/headerLeft';
import UserDetails from '../views/userDetailsScreen';
import UserList from '../views/userListScreen';
import TabView from '../views/tabViewScreen';

import * as constants from '../constants/constants';
import Favourite from '../views/favouriteScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={constants.SPLASH}
          component={SpashScreen}
          options={{
            headerShown: false,
            animation: 'simple_push',
            orientation: 'portrait',
          }}
        />
        <Stack.Screen
          name={constants.USERLIST}
          component={UserList}
          options={navigation => ({
            animation: 'slide_from_right',
            headerTitle: HeaderTitle,
            headerRight: () => <HeaderRight navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name={constants.USERDETAILS}
          component={UserDetails}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name={constants.TABVIEW}
          component={TabView}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name={constants.FAVOURITE}
          component={Favourite}
          options={{animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;
