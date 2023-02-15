import React from 'react';

import {Keyboard, TouchableWithoutFeedback} from 'react-native';

import ListComponent from '../components/listComponent';

import {NavigationContext} from '../contexts/NavigationContext';

import {Navigation} from '../interfaces/interfaces';

import * as constant from '../constants/constants';

const UserList = ({navigation}: {navigation: Navigation}) => {
  return (
    <NavigationContext.Provider value={navigation}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ListComponent
          source={constant.USER_LIST_API_ENDPOINT}
          searchOnlyList={false}
        />
      </TouchableWithoutFeedback>
    </NavigationContext.Provider>
  );
};

export default UserList;
