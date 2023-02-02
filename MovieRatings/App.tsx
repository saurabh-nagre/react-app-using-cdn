import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Login from './src/components/Auth/Login';
import Ratings from './src/components/Home/Ratings';
import Signup from './src/components/Auth/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as constants from './src/constants/constants';
export default function App() {
  const stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName={constants.LOGIN}>
        <stack.Screen
          name={constants.LOGIN}
          options={{headerShown: false}}
          component={Login}
        />
        <stack.Screen
          name={constants.SIGNUP}
          options={{headerShown: false}}
          component={Signup}
        />
        <stack.Screen name={constants.RATINGS} component={Ratings} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
