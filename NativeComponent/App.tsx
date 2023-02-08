import React from 'react';
import {Text, View} from 'react-native';
import Dashboard from './src/Dashboard';
import { ImageView } from './src/ImageView';
import {NativeText} from './src/TextView';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <NativeText
        style={{
          flex: 1,
        }}
        color="#FFFFFF"
        text="Native UI Components : TextView"
      />
      <Dashboard />
    </View>
  );
};

export default App;
