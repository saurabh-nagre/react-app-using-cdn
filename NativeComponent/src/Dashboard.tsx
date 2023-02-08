import React from 'react';
import {View} from 'react-native';

import {NativeImageView} from './ImageView';
import {NativeText} from './TextView';
const Dashboard = () => {
  return (
    <View style={{flex: 1}}>
      <NativeText
        style={{
          fontSize: 17,
          color: '#000',
          flex: 1,
          textAlign: 'center',
        }}
        text="Saurabh-nagre"
      />

      <NativeImageView
        style={{width: 300, height:300}}
        source="https://images.pexels.com/photos/954929/pexels-photo-954929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
    </View>
  );
};
export default Dashboard;
