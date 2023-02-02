import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ratingData from './data.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as constants from './../../constants/constants';
const colors = [
  '#54ebeb',
  '#e664f5',
  '#e38407',
  '#902ded',
  '#2dedb7',
  '#ed2db0',
];

const ListItem = ({data}) => {
  return (
    <View
      style={{
        ...styles.listitem,
        backgroundColor: colors[Number.parseInt(data.id, 10) % colors.length],
      }}>
      <Image
        source={{uri: data.imageuri}}
        style={styles.logo}
        resizeMode="cover"
      />
      <View style={styles.head}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.type}>{data.type}</Text>
      </View>
      <View style={styles.rating}>
        <Icon name="star" size={16} color="yellow" />
        <Text style={styles.text}>{data.rating}</Text>
      </View>
    </View>
  );
};

export default function Ratings({navigation}) {
  const logout = () => {
    navigation.replace(constants.LOGIN);
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => logout()}>
          <MaterialIcon name="logout" color="red" size={26} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={ratingData.ratings}
        renderItem={info => <ListItem data={info.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listitem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: '2%',
    padding: '3%',
    borderRadius: 10,
    width: '96%',
  },
  logo: {
    width: '20%',
    height: 100,
    borderRadius: 10,
  },
  head: {
    width: '60%',
  },
  rating: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    margin: '2%',
    marginHorizontal: '5%',
  },
  type: {
    marginHorizontal: '5%',
  },
  text: {
    margin: '5%',
    color: 'white',
  },
});
