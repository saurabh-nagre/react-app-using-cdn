import React, {useEffect, useRef, useState} from 'react';

import {Alert, StyleSheet, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sha256 from 'crypto-js/sha256';

const CustomTextInput = ({
  index,
  state,
  setState,
  refs,
  handleSubmit,
}: {
  index: number;
  state: number[];
  setState: React.Dispatch<React.SetStateAction<any[]>>;
  refs: any[];
  handleSubmit: Function;
}) => {
  return (
    <TextInput
      inputMode="numeric"
      keyboardType="numeric"
      value={state[index] ? '*' : ''}
      onChangeText={text => {
        setState([
          ...state.slice(0, index),
          text !== '' ? Number(text) : '',
          ...state.slice(index + 1),
        ]);
        refs[
          text ? Math.min(index + 1, 3) : Math.max(index - 1, 0)
        ].current.focus();
      }}
      autoFocus={index === 0 ? true : false}
      maxLength={1}
      style={styles.input}
      ref={refs[index]}
      blurOnSubmit={index === 3}
      onSubmitEditing={() => handleSubmit()}
    />
  );
};

const PinBox = ({
  name,
  setIsAuth,
  userExist,
}: {
  name: string;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  userExist: boolean;
}) => {
  const [pin, setPin] = useState(Array(4).fill(''));
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      if (value) {
        setToken(value);
      }
    });
  });

  const authenticate = () => {
    if (pin.every(value => value !== '')) {
      var ciphertext = sha256(102 + pin.join(''));

      if (token === '') {
        AsyncStorage.setItem('token', ciphertext.toString());
        setIsAuth(true);
      } else if (token !== ciphertext.toString()) {
        Alert.alert('Wrong PIN input');
      } else {
        setIsAuth(true);
      }

      console.log('encrypted text', ciphertext.toString());
    } else {
      Alert.alert('Enter PIN input');
    }
  };

  const handleSubmit = () => {
    if (!userExist) {
      Alert.alert('Confirm', 'You want to save changes?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.debug('ok pressed');
            if (name.length > 0) {
              AsyncStorage.setItem('BrainStoreUser', name);
              authenticate();
            } else {
              Alert.alert('Name Required', 'Please Enter your name first');
            }
          },
        },
      ]);
    } else {
      authenticate();
    }
  };

  return (
    <View style={styles.verticalFlex}>
      <View style={styles.horizontalFlex}>
        {Array(4)
          .fill(0)
          .map((value, index) => (
            <CustomTextInput
              key={index}
              index={index}
              setState={setPin}
              state={pin}
              refs={[input1, input2, input3, input4]}
              handleSubmit={handleSubmit}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalFlex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    fontSize: 30,
    margin: '5%',
    padding: '2%',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    color: 'black',
    margin: '20%',
    elevation: 20,
    padding: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  verticalFlex: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default PinBox;
