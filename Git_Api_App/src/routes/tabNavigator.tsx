import React from 'react';
import {Dimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';

import ListComponent from '../components/listComponent';
import {Details} from '../interfaces/interfaces';

const TabNavigator = ({details}: {details: Details}) => {
  const [index, setIndex] = React.useState(0);

  const initialLayout = {
    width: Dimensions.get('window').width,
  };
  const [routes] = React.useState([
    {key: 'followers', title: 'Followers'},
    {key: 'following', title: 'Following'},
  ]);
  const clipURL = (url: string) => {
    let sliceEnd: number = url.indexOf('{');

    return url.slice(0, sliceEnd);
  };
  const sceneMap = SceneMap({
    followers: () => (
      <ListComponent source={details.followers_url} searchOnlyList={true} />
    ),
    following: () => (
      <ListComponent
        source={clipURL(details.following_url)}
        searchOnlyList={true}
      />
    ),
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={sceneMap}
      initialLayout={initialLayout}
      onIndexChange={setIndex}
    />
  );
};

export default TabNavigator;
