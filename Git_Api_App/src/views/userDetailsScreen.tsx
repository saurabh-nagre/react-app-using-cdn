import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import UserDetailCard from '../components/userDetailCard';

import {NavigationContext} from '../contexts/NavigationContext';

import {Navigation, Route} from '../interfaces/interfaces';

const UserDetails = ({
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
      <View style={styles.body}>
        <UserDetailCard details={details} />
      </View>
    </NavigationContext.Provider>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: 'white',
  },
});
export default UserDetails;
