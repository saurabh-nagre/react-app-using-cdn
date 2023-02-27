import React, {useEffect, useState} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';

import WithComponentList from '../components/withComponentList';
import UserCard from '../components/userCard';
import {styles} from './styles';

const ListView = WithComponentList(UserCard);

const ListComponent = ({
  source,
  searchOnlyList,
}: {
  source: string;
  searchOnlyList: boolean;
}) => {
  const [isOnline, setisOnline] = useState(false);

  const getStatus = () => {
    NetInfo.refresh()
      .then(value => {
        setisOnline(value.isConnected);
      })
      .catch(reason => console.log(reason));
  };

  useEffect(() => {
    try {
      NetInfo.addEventListener(state => setisOnline(state.isConnected));
    } catch {
      console.debug('error in setting up network status');
    }
  });

  return isOnline ? (
    <ListView apiURL={source} searchOnlyList={searchOnlyList} />
  ) : (
    <View style={styles.verticalFlex}>
      <Text style={styles.textBold}>You are not connected to the network!</Text>
      <TouchableOpacity onPress={() => getStatus()}>
        <Icon name="wifi-refresh" size={35} />
      </TouchableOpacity>
    </View>
  );
};

export default ListComponent;
