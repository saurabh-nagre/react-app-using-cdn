import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserDetails from '../views/userDetailsScreen';
import UserList from '../views/userListScreen';
import TabView from '../views/tabViewScreen';

import SpashScreen from '../views/spashScreen';

import * as constants from '../constants/constants';

import HeaderTitle from '../components/headerComponent';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name={constants.SPLASH}
          component={SpashScreen}
          options={{headerShown: false, animation: 'simple_push'}}
        /> */}
        <Stack.Screen
          name={constants.USERLIST}
          component={UserList}
          options={{
            animation: 'slide_from_right',
            headerTitle: props => <HeaderTitle {...props} />,
          }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;
