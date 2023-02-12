import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import {NavigationContext} from '../contexts/NavigationContext';

import {Details} from '../interfaces/interfaces';

import * as constants from '../constants/constants';

import {styles} from './styles';

const UserCardMain = ({details, align}: {details: Details; align: string}) => {
  const navigation = useContext(NavigationContext);

  const moveToTabView = () => {
    navigation.navigate(constants.TABVIEW, {details});
  };

  return (
    <View
      style={{
        alignItems: align,
      }}>
      <Text style={[styles.textBold, styles.bigText]}>{details.name}</Text>

      <View style={styles.horizontalFlex} onTouchEnd={() => moveToTabView()}>
        <Icon
          name="account-multiple-outline"
          size={18}
          color={constants.BLACK}
        />
        <Text style={align === 'center' ? styles.textBold : styles.text}>
          {details.followers > 999
            ? (details.followers / 1000).toFixed(1) + 'k'
            : details.followers}{' '}
          followers.
        </Text>
        <Text style={align === 'center' ? styles.textBold : styles.text}>
          {details.following > 999
            ? (details.following / 1000).toFixed(1) + 'k'
            : details.following}{' '}
          following
        </Text>
      </View>

      <View style={[styles.horizontalFlex]}>
        <Octicons name="repo" size={15} />
        <Text style={styles.text}>Repositories</Text>
        <Text style={[styles.text, styles.circle]}>{details.public_repos}</Text>

        <Text style={styles.text}>{'< >'} Gists</Text>
        <Text style={[styles.text, styles.circle]}>{details.public_gists}</Text>
      </View>

      <View style={styles.horizontalFlex}>
        <Icon name="office-building-outline" size={16} />
        <Text numberOfLines={2} style={styles.text}>
          {details.company}
        </Text>
      </View>

      <View style={styles.horizontalFlex}>
        <Octicons name="location" size={15} color={constants.BLACK} />
        <Text style={styles.text}>{details.location}</Text>
      </View>
    </View>
  );
};

export default UserCardMain;
