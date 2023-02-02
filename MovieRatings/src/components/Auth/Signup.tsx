import React, {useReducer} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {styles} from './Login';

import * as constants from './../../constants/constants';

const initialState = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  errors: {},
  focus: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case constants.CHANGEEMAIL:
      return {...state, email: action.payload};
    case constants.CHANGEPASSWORD:
      return {...state, password: action.payload};
    case constants.CHANGEUSERNAME:
      return {...state, username: action.payload};
    case constants.CHANGECPASSWORD:
      return {...state, confirmPassword: action.payload};
    case constants.ADDERROR:
      return {...state, errors: action.payload};
    case constants.SETFOCUS:
      return {...state, focus: action.payload};
    case constants.RESET:
      return initialState;
    default:
      return initialState;
  }
};

export default function Signup({navigation}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const textInputStyle1 = {
    borderColor: 'black',
    borderWidth: 0.7,
    fontSize: 17,
  };
  const textInputStyle2 = {
    borderColor: 'lightblue',
    borderWidth: 4,
    fontSize: 19,
  };
  const submitDetails = () => {
    if (state.email === '') {
      dispatch({
        type: constants.ADDERROR,
        payload: {email: constants.ERROR},
      });
    } else if (state.username === '') {
      dispatch({
        type: constants.ADDERROR,
        payload: {username: constants.ERROR},
      });
    } else if (
      state.password === '' ||
      state.confirmPassword !== state.password
    ) {
      dispatch({
        type: constants.ADDERROR,
        payload: {
          password: constants.ERROR,
          confirmPassword: constants.CONFIRMERROR,
        },
      });
    } else {
      dispatch({type: constants.RESET});
      navigation.replace(constants.RATINGS);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate(constants.LOGIN);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={require('./logo.png')}
        resizeMode="contain"
      />

      <View style={styles.form}>
        <Text style={styles.bigtext}>Sign Up</Text>
        <TextInput
          keyboardType="email-address"
          style={{
            ...styles.input,
            ...(state.focus === 0 ? textInputStyle2 : textInputStyle1),
          }}
          placeholder="Email"
          value={state.email}
          onChangeText={text =>
            dispatch({type: constants.CHANGEEMAIL, payload: text})
          }
          autoFocus
          onFocus={() => dispatch({type: constants.SETFOCUS, payload: 0})}
        />
        {state.errors.email ? (
          <Text style={styles.error}>{state.errors.email}</Text>
        ) : (
          ''
        )}

        <TextInput
          keyboardType="default"
          style={{
            ...styles.input,
            ...(state.focus === 1 ? textInputStyle2 : textInputStyle1),
          }}
          placeholder="Username"
          value={state.username}
          onChangeText={text =>
            dispatch({
              type: constants.CHANGEUSERNAME,
              payload: text,
            })
          }
          onFocus={() => dispatch({type: constants.SETFOCUS, payload: 1})}
        />
        {state.errors.username ? (
          <Text style={styles.error}>{state.errors.username}</Text>
        ) : (
          ''
        )}

        <TextInput
          style={{
            ...styles.input,
            ...(state.focus === 2 ? textInputStyle2 : textInputStyle1),
          }}
          placeholder="Password"
          secureTextEntry={true}
          value={state.password}
          onFocus={() => dispatch({type: constants.SETFOCUS, payload: 2})}
          onChangeText={text =>
            dispatch({type: constants.CHANGEPASSWORD, payload: text})
          }
        />
        {state.errors.password ? (
          <Text style={styles.error}>{state.errors.password}</Text>
        ) : (
          ''
        )}

        <TextInput
          style={{
            ...styles.input,
            ...(state.focus === 3 ? textInputStyle2 : textInputStyle1),
          }}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={state.confirmPassword}
          onFocus={() => dispatch({type: constants.SETFOCUS, payload: 3})}
          onChangeText={text =>
            dispatch({type: constants.CHANGECPASSWORD, payload: text})
          }
        />
        {state.errors.confirmPassword ? (
          <Text style={styles.error}>{state.errors.confirmPassword}</Text>
        ) : (
          ''
        )}

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => submitDetails()}>
          <Text style={styles.text}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => navigateToLogin()}>
          <Text style={styles.smalltxt}>ALREADY HAVE AN ACCOUNT ? LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
