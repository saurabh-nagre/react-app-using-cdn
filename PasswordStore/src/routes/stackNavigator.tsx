import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SigninAuth from '../views/signinAuth';
import PasswordCreateView from '../views/passwordCreateView';
import PasswordListView from '../views/passwordListView';
import SignupAuth from '../views/signupAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="signin"
        component={SigninAuth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signup"
        component={SignupAuth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="passwordList"
        component={PasswordListView}
        options={{title: 'Passwords'}}
      />
      <Stack.Screen
        name="passwordCreate"
        component={PasswordCreateView}
        options={{title: 'Create Password'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default StackNavigator;
