import React, {useEffect} from 'react';
import {View} from 'react-native';

import TabNavigator from '../routes/tabNavigator';

import {NavigationContext} from '../contexts/NavigationContext';

import {Navigation, Route} from '../interfaces/interfaces';

const TabViewScreen = ({
  navigation,
  route,
}: {
  navigation: Navigation;
  route: Route;
}) => {
  const details = route.params.details;

  useEffect(() => {
    if (details) {
      navigation.setOptions({title: details.login});
    }
  }, [details, navigation]);

  return details ? (
    <NavigationContext.Provider value={navigation}>
      <TabNavigator details={details} />
    </NavigationContext.Provider>
  ) : (
    <View />
  );
};

export default TabViewScreen;
