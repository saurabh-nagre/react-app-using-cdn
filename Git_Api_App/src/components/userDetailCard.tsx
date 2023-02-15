import React, {useState} from 'react';

import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import FavouriteIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

import UserCardMain from './userCardMain';
import LinkComponent from './linkComponent';

import {Details} from '../interfaces/interfaces';

import * as constants from '../constants/constants';

import {styles} from './styles';
import {
  InsertFavoriteUser,
  RemoveFavouriteUser,
} from '../actions/FavouriteActions';

const UserDetailCard = ({details}: {details: Details}) => {
  const dispatch = useDispatch();

  const [isFavourite, setFavourite] = useState(
    useSelector(state => state.FavouriteReducer.has(details.login)),
  );

  const handleChange = () => {
    setFavourite(!isFavourite);
    !isFavourite
      ? dispatch(InsertFavoriteUser(details))
      : dispatch(RemoveFavouriteUser(details.login));
  };

  return (
    <ScrollView contentContainerStyle={cardStyles.verticalFlex}>
      <View style={cardStyles.verticalFlex}>
        <Image source={{uri: details.avatar_url}} style={cardStyles.image} />

        <UserCardMain details={details} align={'center'} />

        {details.bio ? (
          <Text style={styles.text}>{details.bio}</Text>
        ) : (
          <View />
        )}
        <View style={styles.horizontalFlex}>
          <Icon name="link" size={16} />
          <LinkComponent goToURL={details.blog}>
            <Text style={styles.link}>{details.blog}</Text>
          </LinkComponent>
        </View>

        <View style={[styles.horizontalFlex, cardStyles.btn]}>
          <Icon.Button name="mark-github" size={18}>
            <LinkComponent goToURL={details.html_url}>
              <Text style={styles.linkButton}>Open on Github web</Text>
            </LinkComponent>
          </Icon.Button>
        </View>

        <TouchableOpacity onPress={handleChange}>
          {isFavourite ? (
            <FavouriteIcon name="heart" size={50} color={constants.RED} />
          ) : (
            <FavouriteIcon name="heart-o" size={50} />
          )}
        </TouchableOpacity>
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
  btn: {
    margin: '10%',
  },
});

export default UserDetailCard;
