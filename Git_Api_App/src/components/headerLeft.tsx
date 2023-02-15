import React from 'react';

import {useHeaderHeight} from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Navigation} from '../interfaces/interfaces';

import * as constants from '../constants/constants';

const HeaderRight = ({navigation}: {navigation: {navigation: Navigation}}) => {
  const navigateToFavourites = () => {
    navigation.navigation.navigate(constants.FAVOURITE);
  };
  return (
    <Icon
      name="account-heart"
      size={useHeaderHeight() - 20}
      color={constants.BLACK}
      onPress={navigateToFavourites}
    />
  );
};

export default HeaderRight;
