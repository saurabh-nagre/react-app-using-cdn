import React, {useContext, useEffect, useState} from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import UserCardMain from './userCardMain';

import {NavigationContext} from '../contexts/NavigationContext';

import {Details, Navigation} from '../interfaces/interfaces';

import * as constants from '../constants/constants';
import * as helpers from '../helpers/helpers';

import {styles} from './styles';
// it gets the props as a object, which is response of https://api.github.com/users
const UserCard = ({
  details,
  fetchRequired = true,
}: {
  details: Details;
  fetchRequired: boolean;
}) => {
  const [userDetails, setUserDetails] = useState<Details>();

  const navigation = useContext<Navigation>(NavigationContext);

  useEffect(() => {
    if (fetchRequired) {
      helpers
        .GetDataHelper(constants.USER_LIST_API_ENDPOINT + '/' + details.login)
        .then(value => setUserDetails(value.data))
        .catch(reason => console.debug(reason));
    } else {
      setUserDetails(details);
    }
  }, [details, fetchRequired]);

  const navigateToUserDetails = () => {
    fetchRequired
      ? navigation.navigate(constants.USERDETAILS, {details: userDetails})
      : navigation.replace(constants.USERDETAILS, {details, userDetails});
  };

  return userDetails ? (
    <TouchableOpacity
      style={[styles.horizontalFlex, styles.card]}
      onPress={() => navigateToUserDetails()}>
      <View style={[styles.front, styles.verticalFlex]}>
        <Image
          source={{
            uri: details.avatar_url
              ? details.avatar_url
              : require('../assets/user.jpg'),
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={[styles.text, styles.textBold]}>{details.login}</Text>
      </View>

      <View style={[styles.verticalFlex, cardStyles.cardLeft]}>
        <UserCardMain details={userDetails} align="flex-start" />
      </View>
    </TouchableOpacity>
  ) : (
    <View />
  );
};

const cardStyles = StyleSheet.create({
  cardLeft: {width: '70%', alignItems: 'flex-start'},
});

export default UserCard;
