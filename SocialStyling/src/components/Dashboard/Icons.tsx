import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as constants from '../svgs';

const iconsArray = [
  {icon: constants.PHONECALL, name: 'Phone Number'},
  {icon: constants.WHATSAPP, name: 'WhatsApp'},
  {icon: constants.INSTAGRAM, name: 'Instagram'},
  {icon: constants.EMAIL, name: 'Email'},
  {icon: constants.SNAPCHAT, name: 'Snapchat'},
  {icon: constants.YOUTUBE, name: 'YouTube'},
  {icon: constants.BROWSER, name: 'Browser'},
  {icon: constants.TWITTER, name: 'Twitter'},
  {icon: constants.LINKEDIN, name: 'Linkein'},
];

export default function Icons() {
  return (
    <View style={styles.container}>
      {iconsArray.map((value, index) => (
        <View key={index} style={styles.content}>
          <Image source={{uri: value.icon}} style={styles.icon} />
          <Text>{value.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '30%',
    marginVertical: '5%',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
