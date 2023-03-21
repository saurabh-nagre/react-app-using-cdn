import React, {useState} from 'react';

import {View} from 'react-native/';

const SignupAuth = () => {
  const [username, setUsername] = useState('');
  const [color, setColor] = useState('');

  return (
    <View>
          <TextInput
            value={username}
            placeholder="Enter Your Name"
            style={styles.inputText}
            placeholderTextColor="lightgrey"
            onChangeText={setUsername}
            autoFocus
            autoComplete="name"
          />

        <TextInput
          value={color}
          placeholder="Enter favaurite color"
          style={styles.inputText}
          placeholderTextColor="lightgrey"
          onChangeText={setColor}
          autoComplete="name"
          onSubmitEditing={checkColor}
        />
      )}
    </View>
  );
};

export default SignupAuth;
