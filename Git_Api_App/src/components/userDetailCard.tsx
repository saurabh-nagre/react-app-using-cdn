import React from 'react';

import {Image, StyleSheet, ScrollView, Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/Octicons';

import UserCardMain from './userCardMain';
import LinkComponent from './linkComponent';

import {Details} from '../interfaces/interfaces';

import * as constants from '../constants/constants';

import {styles} from './styles';

const UserDetailCard = ({details}: {details: Details}) => {
  return (
    <ScrollView>
      <View style={cardStyles.verticalFlex}>
        <Image source={{uri: details.avatar_url}} style={cardStyles.image} />

        <UserCardMain details={details} align={'center'} />

        {details.bio ? (
          <Text style={styles.text}>{details.bio}</Text>
        ) : (
          <View />
        )}
        <View style={styles.horizontalFlex}>
          <Octicons name="link" size={16} />
          <LinkComponent goToURL={details.blog}>
            <Text style={styles.link}>{details.blog}</Text>
          </LinkComponent>
        </View>

        <View style={styles.horizontalFlex}>
          <Icon.Button name="mark-github" size={18}>
            <LinkComponent goToURL={details.html_url}>
              <Text style={styles.linkButton}>Open on Github web</Text>
            </LinkComponent>
          </Icon.Button>
        </View>
      </View>
    </ScrollView>
  );
};

const cardStyles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    margin: '2%',
    borderRadius: constants.IMAGE_BORDER_RADIUS,
  },
  horizontalFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalFlex: {
    alignItems: 'center',
    backgroundColor: constants.WHITE,
    justifyContent: 'space-around',
  },
});

export default UserDetailCard;
