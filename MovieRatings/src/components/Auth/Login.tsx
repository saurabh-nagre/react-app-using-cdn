import React, {useEffect, useReducer} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import * as constants from './../../constants/constants';

const initialState = {
  email: '',
  password: '',
  errors: {},
  focus: 0,
  isLoggedIn: false,
};

export default function Signup({navigation}) {
  const reducer = (state, action) => {
    switch (action.type) {
      case constants.CHANGEEMAIL:
        return {...state, email: action.payload};
      case constants.CHANGECPASSWORD:
        return {...state, password: action.payload};
      case constants.ADDERROR:
        return {...state, errors: action.payload};
      case constants.SETFOCUS:
        return {...state, focus: action.payload};
      case constants.RESET:
        return initialState;
      case constants.CHANGELOGGEDINSTATUS:
        return {...state, isLoggedIn: action.payload};
      default:
        return initialState;
    }
  };

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
    } else if (state.password === '') {
      dispatch({
        type: constants.ADDERROR,
        payload: {
          password: constants.ERROR,
        },
      });
    } else {
      dispatch({action: constants.RESET});
      navigateToRatings();
    }
  };

  const navigateToSignup = () => {
    navigation.navigate(constants.SIGNUP);
  };

  const navigateToRatings = () => {
    dispatch({type: constants.CHANGELOGGEDINSTATUS, payload: true});
    navigation.replace(constants.RATINGS);
  };

  useEffect(() => {
    if (state.isLoggedIn) {
      navigateToRatings();
    }
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={require('./logo.png')}
        resizeMode="contain"
      />

      <View style={styles.form}>
        <Text style={styles.bigtext}>Login</Text>
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
          style={{
            ...styles.input,
            ...(state.focus === 2 ? textInputStyle2 : textInputStyle1),
          }}
          placeholder="Password"
          secureTextEntry={true}
          value={state.password}
          onFocus={() => dispatch({type: constants.SETFOCUS, payload: 2})}
          onChangeText={text =>
            dispatch({type: constants.CHANGECPASSWORD, payload: text})
          }
        />
        {state.errors.password ? (
          <Text style={styles.error}>{state.errors.password}</Text>
        ) : (
          ''
        )}

        <Text style={styles.smalltxt}>forgot password?</Text>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => submitDetails()}>
          <Text style={styles.text}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => navigateToSignup()}>
          <Text style={styles.smalltxt}>DON'T HAVE AN ACCOUNT ? SIGNUP</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
  },
  bigtext: {
    fontSize: 30,
    margin: 10,
    fontWeight: '900',
    color: 'black',
    opacity: 0.8,
  },
  image: {
    width: '40%',
    margin: '10%',
    alignSelf: 'center',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '70%',
    marginLeft: '15%',
  },
  input: {
    width: '100%',
    borderRadius: 10,
    marginVertical: '4%',
    paddingHorizontal: '4%',
    fontFamily: 'sans-serif-medium',
  },
  touchable: {
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    margin: '5%',
    width: '50%',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
  smalltxt: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    marginHorizontal: '2%',
  },
  signup: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: '10%',
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
  },
});
