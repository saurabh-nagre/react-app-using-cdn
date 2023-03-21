import React, {useEffect, useState} from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PinBox from '../components/pinBox';

import {Navigation} from '../interfaces';

const LogoImage = require('../assets/BS.png');

const SigninAuth = ({navigation}: {navigation: Navigation}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [stateForgot, setStateForgot] = useState(false);
  const [doesExist, setDoesExist] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('BrainStoreUser').then(value => {
      if (value) {
        setDoesExist(true);
        setUsername(value);
      } else {
        setDoesExist(false);
      }
    });
  });

  useEffect(() => {
    if (!doesExist) {
      navigation.replace('signup', {forgot: stateForgot});
    }
  }, [doesExist, navigation, stateForgot]);

  useEffect(() => {
    if (isAuth) {
      navigation.replace('passwordList');
    }
  }, [isAuth, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.verticalFlex}>
      <Image source={LogoImage} style={styles.image} />

      <Text style={styles.bigText}>Welcome, {username}</Text>

      <PinBox name={username} setIsAuth={setIsAuth} userExist={doesExist} />

      <TouchableOpacity onPress={() => setStateForgot(true)}>
        <Text style={styles.bigText}>Forgot Password?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  verticalFlex: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '30%',
    flexBasis: '30%',
  },
  bigText: {
    color: 'white',
    fontSize: 20,
    flexBasis: '10%',
    fontWeight: 'bold',
  },
  inputText: {
    color: 'white',
    minWidth: '70%',
    maxWidth: '70%',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'grey',
    margin: '5%',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});

export default SigninAuth;
