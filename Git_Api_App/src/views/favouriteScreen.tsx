import React, {useEffect, useState} from 'react';

import {FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import UserCard from '../components/userCard';
import {NavigationContext} from '../contexts/NavigationContext';

import {Details, Navigation} from '../interfaces/interfaces';

import {styles} from '../components/styles';

const Favourite = ({navigation}: {navigation: Navigation}) => {
  const favouriteList: Map<string, Details> = useSelector(
    (state: any) => state.FavouriteReducer,
  );

  const [userList, setUserList] = useState<Details[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let list: Details[] = [];
    favouriteList.forEach(value => {
      list.push(value);
    });
    console.debug(list.length);
    setUserList(list);
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.verticalFlex}>
      <NavigationContext.Provider value={navigation}>
        <FlatList
          renderItem={item => (
            <UserCard details={item.item} fetchRequired={false} />
          )}
          data={userList}
          keyExtractor={item => item.login}
          refreshing={isLoading}
          ListEmptyComponent={
            <Text style={styles.textBold}>Oops, No Favourites added!</Text>
          }
        />
      </NavigationContext.Provider>
    </View>
  );
};
export default Favourite;
