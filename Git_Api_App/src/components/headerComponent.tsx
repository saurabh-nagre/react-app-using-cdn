import React from 'react';

import {Image, Text, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import {styles} from './styles';

const HeaderTitle = () => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={styles.horizontalFlex}>
      <Image
        style={{height: headerHeight - 20, width: headerHeight - 20}}
        source={require('../assets/logoWhiteBack.png')}
      />

      <Text style={styles.headerText}>Github</Text>
    </View>
  );
};

export default HeaderTitle;
